import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "in-ui-react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

export const LogoutButton: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  const router = useRouter();

  const logout = () => {
    router.push("/auth");
  };

  return (
    <>
      {!children ? (
        <Tooltip content="Logout">
          <Button
            className={className}
            kind="ghost"
            onlyIcon
            block={!!children}
            textLeft={!!children}
            icon={<ArrowRightOnRectangleIcon />}
            onClick={logout}
          >
            {children}
          </Button>
        </Tooltip>
      ) : (
        <Button
          className={className}
          kind="ghost"
          block={!!children}
          textLeft={!!children}
          icon={<ArrowRightOnRectangleIcon />}
          onClick={logout}
        >
          {children}
        </Button>
      )}
    </>
  );
};
