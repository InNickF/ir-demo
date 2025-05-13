import { TableCard } from "@/commons/components/general/TableCard";
import { TableLoaderAndNoData } from "@/commons/components/general/TableLoaderAndNoData";
import { AssistantMessage as TAssistantMessage } from "@/modules/insight/typings";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Table, Tooltip } from "in-ui-react";
import { FC, useRef, useState } from "react";
import { MessageAvatar } from "../MessageAvatar";
import "./styles.css";

interface AssistantMessageProps {
  message: TAssistantMessage;
}

const prefix = "insight-assistant-message";
export const AssistantMessage: FC<AssistantMessageProps> = ({ message }) => {
  const [isQueryVisible, setIsQueryVisible] = useState(false);
  const queryRef = useRef<HTMLPreElement>(null);

  const copyQueryToClipboard = () => {
    if (queryRef.current && navigator.clipboard && message.query) {
      navigator.clipboard.writeText(queryRef.current.innerText);
    }
  };

  const queryButtonClasses = message.query
    ? `${prefix}-query-button`
    : `${prefix}-query-button ${prefix}-query-button--hide`;

  const tooltipMessage = isQueryVisible ? "Hide Query" : "Show Query";

  const getQueryClasses = (): string => {
    const classes = [`${prefix}-query`, "generic-entrance-animation"];
    !isQueryVisible && classes.push(`${prefix}-query--hide`);
    return classes.join(" ");
  };

  return (
    <div className={`${prefix}-grid generic-entrance-animation`}>
      <div className={prefix}>
        <MessageAvatar role={message.role} />
        <p className={`${prefix}__content`}>{message.content}</p>
        <Tooltip content={tooltipMessage}>
          <Button
            className={queryButtonClasses}
            onlyIcon
            disabled={!message.query}
            icon={isQueryVisible ? <EyeSlashIcon /> : <EyeIcon />}
            onClick={() => setIsQueryVisible((prev) => !prev)}
            kind="outline"
          />
        </Tooltip>
      </div>

      <div className={getQueryClasses()}>
        <div className={`${prefix}-query__content`}>
          <code ref={queryRef}>{message?.query}</code>
        </div>
        <Button
          className={`${prefix}-query__copy-button`}
          kind="ghost"
          size="small"
          onClick={copyQueryToClipboard}
        >
          Copy query
        </Button>
      </div>

      {message.columns && message.columns.length > 0 && message?.data ? (
        <TableCard>
          <TableCard.Body>
            <Table>
              <Table.Head>
                <Table.Row>
                  {message.columns.map((column) => (
                    <Table.Header key={column}>{column}</Table.Header>
                  ))}
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {message.data.map((row, index) => {
                  return (
                    <Table.Row key={index}>
                      {message.columns.map((column) => (
                        <Table.Data key={`${column}-${row[column]}`}>
                          {row[column]}
                        </Table.Data>
                      ))}
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </TableCard.Body>
          <TableLoaderAndNoData isLoading={false} data={message.data} />
        </TableCard>
      ) : null}
    </div>
  );
};
