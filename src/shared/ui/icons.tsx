import type { SVGProps } from 'react';

// Icons exported from the Figma file (20x20 grid, stroke uses currentColor).
// Close, Plus, Minus and Trash are not in the Figma, so they follow the same 1.5px rounded style.

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.583 14.583L18.333 18.333" />
      <path d="M16.667 9.167C16.667 5.025 13.309 1.667 9.167 1.667C5.025 1.667 1.667 5.025 1.667 9.167C1.667 13.309 5.025 16.667 9.167 16.667C13.309 16.667 16.667 13.309 16.667 9.167Z" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 8C15 8 11.318 13 10 13C8.682 13 5 8 5 8" />
    </Icon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5C12 5 7 8.682 7 10C7 11.318 12 15 12 15" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5C8 5 13 8.682 13 10C13 11.318 8 15 8 15" />
    </Icon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.25" {...props}>
      <path d="M5.481 12.901C4.302 13.603 1.211 15.037 3.094 16.831C4.014 17.707 5.038 18.333 6.326 18.333H13.674C14.962 18.333 15.986 17.707 16.906 16.831C18.789 15.037 15.698 13.603 14.519 12.901C11.754 11.255 8.246 11.255 5.481 12.901Z" />
      <path d="M13.75 5.417C13.75 7.488 12.071 9.167 10 9.167C7.929 9.167 6.25 7.488 6.25 5.417C6.25 3.346 7.929 1.667 10 1.667C12.071 1.667 13.75 3.346 13.75 5.417Z" />
    </Icon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16.219 3.328C13.984 1.958 12.034 2.51 10.862 3.39C10.381 3.751 10.141 3.931 10 3.931C9.859 3.931 9.618 3.751 9.138 3.39C7.966 2.51 6.016 1.958 3.781 3.328C0.848 5.127 0.185 11.062 6.949 16.07C8.238 17.023 8.882 17.5 10 17.5C11.118 17.5 11.762 17.023 13.05 16.07C19.815 11.062 19.151 5.127 16.219 3.328Z" />
    </Icon>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.58 6.667H16.83C17.35 6.667 17.61 6.667 17.8 6.751C18.64 7.122 18.27 8.059 18.13 8.732C18.1 8.853 18.02 8.956 17.9 9.011C17.42 9.24 17.08 9.673 16.99 10.178L16.5 12.99C16.28 14.227 16.21 15.995 15.12 16.867C14.33 17.5 13.18 17.5 10.89 17.5H9.11C6.82 17.5 5.67 17.5 4.88 16.867C3.79 15.995 3.72 14.227 3.5 12.99L3.01 10.178C2.92 9.673 2.58 9.24 2.1 9.011C1.98 8.956 1.9 8.853 1.87 8.732C1.73 8.059 1.36 7.122 2.2 6.751C2.39 6.667 2.65 6.667 3.17 6.667H6.25" />
      <path d="M11.67 10H8.33" />
      <path d="M5.42 9.167L8.33 2.5M12.5 2.5L14.58 6.667" />
    </Icon>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.25" {...props}>
      <path d="M15 5.833C15.645 5.967 16.132 6.191 16.524 6.563C17.5 7.493 17.5 8.99 17.5 11.983C17.5 14.977 17.5 16.474 16.524 17.403C15.547 18.333 13.976 18.333 10.833 18.333H9.167C6.024 18.333 4.453 18.333 3.476 17.403C2.5 16.474 2.5 14.977 2.5 11.983C2.5 8.99 2.5 7.493 3.476 6.563C3.868 6.191 4.355 5.967 5 5.833" />
      <path d="M10.021 1.667L10 11.667M12.5 4.107C12.5 4.107 11.128 2.45 10.372 1.813C10.264 1.721 10.143 1.672 10.021 1.667C9.886 1.662 9.749 1.71 9.628 1.812C8.872 2.45 7.5 4.107 7.5 4.107" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 5L5 15M5 5L15 15" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 4.167V15.833M4.167 10H15.833" />
    </Icon>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.167 10H15.833" />
    </Icon>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16.25 4.583L15.734 12.938C15.602 15.073 15.536 16.14 15.001 16.908C14.737 17.287 14.396 17.607 14.001 17.848C13.201 18.333 12.132 18.333 9.993 18.333C7.851 18.333 6.78 18.333 5.98 17.847C5.585 17.607 5.244 17.286 4.98 16.905C4.445 16.137 4.38 15.068 4.251 12.931L3.75 4.583" />
      <path d="M2.5 4.583H17.5M13.38 4.583L12.81 3.414C12.433 2.637 12.244 2.249 11.919 2.007C11.847 1.953 11.771 1.905 11.691 1.864C11.33 1.667 10.899 1.667 10.035 1.667C9.15 1.667 8.708 1.667 8.341 1.861C8.26 1.904 8.183 1.954 8.11 2.01C7.781 2.262 7.597 2.665 7.23 3.47L6.727 4.583" />
      <path d="M7.917 13.75V8.75M12.083 13.75V8.75" />
    </Icon>
  );
}

// Filled star used for ratings (color comes from text color, e.g. text-star)
export function StarIcon(props: IconProps) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8.386 0.691C8.685 -0.23 9.989 -0.23 10.288 0.691L11.807 5.365C11.94 5.777 12.324 6.056 12.758 6.056H17.672C18.641 6.056 19.043 7.295 18.26 7.865L14.284 10.753C13.934 11.008 13.787 11.459 13.921 11.871L15.439 16.545C15.739 17.466 14.684 18.233 13.9 17.663L9.925 14.775C9.574 14.52 9.1 14.52 8.749 14.775L4.773 17.663C3.99 18.233 2.935 17.466 3.235 16.545L4.753 11.871C4.887 11.459 4.74 11.008 4.39 10.753L0.414 7.865C-0.37 7.295 0.033 6.056 1.002 6.056H5.916C6.349 6.056 6.733 5.777 6.867 5.365L8.386 0.691Z" />
    </svg>
  );
}
