import type { CustomFlowbiteTheme } from "flowbite-react";

export const CustomTextInput: CustomFlowbiteTheme["textInput"] = {
  base: "flex",
  addon:
    "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-1 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
  field: {
    base: "relative w-full",
    icon: {
      base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    rightIcon: {
      base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
      svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
    },
    input: {
      base: "block w-full border-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:outline hover:outline-2 hover:outline-cyan-500",
      sizes: {
        sm: "p-1 sm:text-xs",
        md: "p-1 text-sm",
        lg: "p-1 sm:text-base",
      },
      colors: {
        gray: "text-gray-900 dark:text-white dark:placeholder-gray-400",
        info: "text-cyan-900 placeholder-cyan-700 dark:text-cyan-900 dark:placeholder-cyan-700",
        failure:
          "text-red-900 placeholder-red-700 dark:text-red-900 dark:placeholder-red-700",
        warning:
          "text-yellow-900 placeholder-yellow-700 dark:text-yellow-900 dark:placeholder-yellow-700",
        success:
          "text-green-900 placeholder-green-700 dark:text-green-900 dark:placeholder-green-700",
      },
      withRightIcon: {
        on: "pr-10",
        off: "",
      },
      withIcon: {
        on: "pl-10",
        off: "",
      },
      withAddon: {
        on: "rounded-r-lg",
        off: "rounded-lg",
      },
      withShadow: {
        on: "shadow-sm dark:shadow-sm-light",
        off: "",
      },
    },
  },
};
