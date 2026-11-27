export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-between bg-ink px-16 py-3 text-white lg:px-5">
      <p className="mx-auto max-w-61 text-start text-sm leading-[1.2] font-medium lg:max-w-none">
        New season coming! Discount 10% for all product! Checkout Now!
        <span className="ml-4 inline-flex h-4 items-center rounded-full bg-[#383838] px-2 align-middle text-[11px] leading-none lg:h-[18px] lg:px-[9px] lg:text-xs">
          20:40
        </span>
      </p>
    </div>
  );
}
