import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { PageLayout } from "@/shared/components/layout/page-layout";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";
import { Permission } from "@/shared/types";
import { PermissionGate } from "@/shared/components/permission-gate";
import { ROUTES } from "@/shared/constants/routes";
import { useUser } from "../hooks";

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(id!);

  if (isLoading) return <LoadingSkeleton variant="form" count={4} />;
  if (!user) return null;

  return (
    <PageLayout
      title={user.name}
      description={user.email}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(ROUTES.USERS)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <PermissionGate permission={Permission.USERS_UPDATE}>
            <Button onClick={() => navigate(ROUTES.USER_EDIT(user.id))}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </PermissionGate>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {user.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <Badge
                variant={user.status === "active" ? "default" : "outline"}
                className="mt-1"
              >
                {user.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Created
              </p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
