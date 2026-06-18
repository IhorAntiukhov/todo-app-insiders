import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome to To-Do app!</CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
}
