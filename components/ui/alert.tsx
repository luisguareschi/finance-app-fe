"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button } from "./button";
import Spinner from "../common/spinner";

export interface AlertConfig {
  id: string;
  title: string;
  subtitle?: string;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

interface AlertContextType {
  showAlert: (config: Omit<AlertConfig, "id">) => void;
  hideAlert: (id: string) => void;
}

const AlertContext = React.createContext<AlertContextType | undefined>(
  undefined,
);

export function useAlert() {
  const context = React.useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = React.useState<AlertConfig[]>([]);

  const showAlert = React.useCallback((config: Omit<AlertConfig, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts((prev) => [...prev, { ...config, id }]);
  }, []);

  const hideAlert = React.useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const handleSubmit = React.useCallback(
    async (alert: AlertConfig) => {
      try {
        if (alert.onSubmit) {
          await alert.onSubmit();
        }
      } finally {
        hideAlert(alert.id);
      }
    },
    [hideAlert],
  );

  const handleCancel = React.useCallback(
    (alert: AlertConfig) => {
      if (alert.onCancel) {
        alert.onCancel();
      }
      hideAlert(alert.id);
    },
    [hideAlert],
  );

  const value = React.useMemo(
    () => ({
      showAlert,
      hideAlert,
    }),
    [showAlert, hideAlert],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.map((alert) => (
        <AlertDialog
          key={alert.id}
          alert={alert}
          onSubmit={() => handleSubmit(alert)}
          onCancel={() => handleCancel(alert)}
        />
      ))}
    </AlertContext.Provider>
  );
}

interface AlertDialogProps {
  alert: AlertConfig;
  onSubmit: () => void;
  onCancel: () => void;
}

function AlertDialog({ alert, onSubmit, onCancel }: AlertDialogProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const getButtonVariant = (variant: AlertConfig["variant"]) => {
    switch (variant) {
      case "destructive":
        return "destructive";
      case "default":
        return "secondary";
    }
    return "default";
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="bg-neutral-900 border border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle>{alert.title}</DialogTitle>
          {alert.subtitle && (
            <DialogDescription className="text-neutral-400">
              {alert.subtitle}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="gap-2">
          {alert.onCancel && (
            <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
              {alert.cancelText || "Cancel"}
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant={getButtonVariant(alert.variant)}
          >
            {isSubmitting ? (
              <Spinner className="size-4" />
            ) : (
              alert.submitText || "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
