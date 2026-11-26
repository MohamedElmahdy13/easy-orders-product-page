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

export function MenuIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.25" {...props}>
      <path d="M3.333 4.167H16.667M3.333 10H16.667M3.333 15.833H16.667" />
    </Icon>
  );
}

// Small 12px arrow used between breadcrumb items
export function BreadcrumbArrowIcon(props: IconProps) {
  return (
    <Icon width="12" height="12" viewBox="0 0 12 12" {...props}>
      <path d="M4.455 9.96L7.715 6.7C8.1 6.315 8.1 5.685 7.715 5.3L4.455 2.04" />
    </Icon>
  );
}

// Social icons from the footer (18px grid)
export function FacebookIcon(props: IconProps) {
  return (
    <Icon width="18" height="18" viewBox="0 0 18 18" {...props}>
      <path d="M4.938 7.461V10.461H7.188V15.711H10.188V10.461H12.438L13.188 7.461H10.188V5.961C10.188 5.762 10.267 5.571 10.408 5.431C10.548 5.29 10.739 5.211 10.938 5.211H13.188V2.211H10.938C9.943 2.211 8.99 2.606 8.286 3.309C7.583 4.012 7.188 4.966 7.188 5.961V7.461H4.938Z" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.493 5.961C14.493 4.718 13.486 3.711 12.243 3.711H6.243C5.001 3.711 3.993 4.718 3.993 5.961V11.961C3.993 13.204 5.001 14.211 6.243 14.211H12.243C13.486 14.211 14.493 13.204 14.493 11.961V5.961ZM15.993 11.961C15.993 14.032 14.314 15.711 12.243 15.711H6.243C4.172 15.711 2.493 14.032 2.493 11.961V5.961C2.493 3.89 4.172 2.211 6.243 2.211H12.243C14.314 2.211 15.993 3.89 15.993 5.961V11.961ZM10.743 8.961C10.743 8.133 10.072 7.461 9.243 7.461C8.415 7.461 7.743 8.133 7.743 8.961C7.743 9.789 8.415 10.461 9.243 10.461C10.072 10.461 10.743 9.789 10.743 8.961ZM12.243 8.961C12.243 10.618 10.9 11.961 9.243 11.961C7.586 11.961 6.243 10.618 6.243 8.961C6.243 7.304 7.586 5.961 9.243 5.961C10.9 5.961 12.243 7.304 12.243 8.961ZM12.618 4.836C12.204 4.836 11.868 5.173 11.868 5.587C11.868 6.001 12.204 6.337 12.618 6.337C13.032 6.337 13.368 6.001 13.368 5.587C13.368 5.173 13.032 4.836 12.618 4.836Z"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <Icon width="18" height="18" viewBox="0 0 18 18" {...props}>
      <path d="M16.227 2.93C15.477 3.297 14.742 3.446 13.977 3.672C13.136 2.723 11.89 2.671 10.692 3.119C9.494 3.568 8.71 4.664 8.727 5.922V6.672C6.293 6.734 4.126 5.626 2.727 3.672C2.727 3.672 -0.409 9.247 5.727 11.922C4.323 12.857 2.923 13.488 1.227 13.422C3.708 14.774 6.412 15.239 8.753 14.56C11.438 13.78 13.644 11.768 14.491 8.753C14.743 7.837 14.869 6.889 14.864 5.939C14.862 5.752 15.996 3.86 16.227 2.929V2.93Z" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.204 6.573L9.62 10.296C9.368 10.464 9.04 10.464 8.788 10.296L3.204 6.573V12.672C3.204 13.086 3.54 13.422 3.954 13.422H14.454C14.868 13.422 15.204 13.086 15.204 12.672V6.573ZM3.288 4.826L9.204 8.77L15.12 4.826C14.995 4.586 14.744 4.422 14.454 4.422H3.954C3.664 4.422 3.413 4.586 3.288 4.826ZM16.704 5.159C16.697 3.922 15.692 2.922 14.454 2.922H3.954C2.716 2.922 1.711 3.922 1.704 5.159M16.704 5.181V12.672C16.704 13.915 15.697 14.922 14.454 14.922H3.954C2.712 14.922 1.704 13.915 1.704 12.672V5.181M16.704 5.172V5.181Z"
      />
    </svg>
  );
}

export function UsFlagIcon(props: IconProps) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" focusable="false" {...props}>
      <rect width="18" height="14" fill="#BD3D44" />
      <path d="M0 2.15H18M0 4.3H18M0 6.45H18M0 8.6H18M0 10.75H18M0 12.9H18" stroke="#FFFFFF" strokeWidth="1.08" />
      <rect width="7.7" height="7.5" fill="#192F5D" />
    </svg>
  );
}
