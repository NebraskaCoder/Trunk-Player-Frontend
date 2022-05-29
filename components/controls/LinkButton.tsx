import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

import type { UrlObject } from "url";
import classNames from "utils/classNames";

declare type Url = string | UrlObject;

interface LinkButtonProps {
  children?: ReactNode;
  className?: string;
  defaultPadding?: boolean;
  defaultFontSize?: boolean;
  href?: Url;
  enabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const LinkButton = ({
  children,
  className,
  defaultPadding = true,
  defaultFontSize = true,
  href,
  enabled = true,
  onClick,
}: LinkButtonProps) => {
  return enabled && href ? (
    <Link
      href={href}
      passHref
    >
      <a
        className={classNames(
          className ?? "",
          defaultPadding ? "px-3 py-2" : "",
          defaultFontSize ? "text-sm" : "",
          "inline-flex cursor-pointer items-center border border-transparent shadow-sm leading-4 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        )}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  ) : (
    <span
      className={classNames(
        className ?? "",
        defaultPadding ? "px-3 py-2" : "",
        defaultFontSize ? "text-sm" : "",
        "inline-flex cursor-default items-center border border-transparent shadow-sm leading-4 font-medium rounded-md text-gray-300 bg-cyan-600 bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      )}
    >
      {children}
    </span>
  );
};

export default LinkButton;
