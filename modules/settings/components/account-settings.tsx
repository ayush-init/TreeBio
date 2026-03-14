"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  AlertTriangle, 
  UserX, 
  Save,
  Loader2,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface AccountSettingsProps {
  initialData?: {
    email?: string;
  };
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ initialData }) => {
  const [email, setEmail] = useState(initialData?.email || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would typically involve updating email in Clerk
      // For now, we'll just show a success message
      toast.success("Email update instructions sent to your current email");
    } catch (error) {
      toast.error("Failed to update email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    try {
      // This would typically involve:
      // 1. Additional verification (password, 2FA, etc.)
      // 2. Confirmation dialog
      // 3. Account deletion process
      toast.error("Account deletion requires additional verification. Please contact support.");
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-green-600" />
          Account Settings
        </CardTitle>
        <CardDescription>
          Manage your account credentials and security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Email Update */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Email Address</Label>
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Changing your email will require verification
              </p>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || email === initialData?.email}
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Update Email
            </Button>
          </form>
        </div>

        <Separator />

        {/* Password Change */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Password</Label>
          <p className="text-sm text-muted-foreground">
            Password changes are managed through your authentication provider
          </p>
          <Button 
            variant="outline"
            onClick={() => toast.info("Password change is handled by your authentication provider")}
          >
            Change Password
          </Button>
        </div>

        <Separator />

        {/* Danger Zone */}
        <div className="space-y-4">
          <Label className="text-base font-medium text-red-600 dark:text-red-400">
            Danger Zone
          </Label>
          
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> Account deletion is permanent and cannot be undone. 
              All your data, links, and analytics will be permanently removed.
            </AlertDescription>
          </Alert>

          {!showDeleteConfirmation ? (
            <Button 
              variant="destructive"
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={isLoading}
            >
              <UserX className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="space-y-2">
                <h4 className="font-medium text-red-700 dark:text-red-300">
                  Confirm Account Deletion
                </h4>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Are you absolutely sure you want to delete your account? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <UserX className="w-4 h-4 mr-2" />
                  )}
                  Yes, Delete My Account
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowDeleteConfirmation(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Account Information</Label>
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Account Status</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Member Since</span>
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Account Type</span>
              <span className="text-sm text-muted-foreground">Free</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
