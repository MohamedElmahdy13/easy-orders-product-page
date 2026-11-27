import { useState } from 'react';
import type { FormEvent } from 'react';
import logo from '@/assets/logo.png';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  TwitterIcon,
  UsFlagIcon,
} from '@/shared/ui/icons';
import { Divider } from '@/shared/ui/Divider';
import { Dropdown } from '@/shared/ui/Dropdown';

const footerColumns = [
  { title: 'Shop', links: ['My account', 'Login', 'Wishlist', 'Cart'] },
  { title: 'Information', links: ['Shipping Policy', 'Returns & Refunds', 'Cookies Policy', 'Frequently asked'] },
  { title: 'Company', links: ['About us', 'Privacy Policy', 'Terms & Conditions', 'Contact Us'] },
];

// These only change the label, the demo has no translations or exchange rates
const languages = ['English', 'Arabic', 'French'];
const currencies = ['USD', 'EUR', 'EGP'];

const socialLinks = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Twitter', Icon: TwitterIcon },
  { label: 'Email', Icon: MailIcon },
];

export function Footer() {
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');

  // No newsletter backend for this task, so the form only stops the page reload
  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <footer className="bg-surface pt-[72px] pb-[22px] lg:pb-8">
      <div className="container-page">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-10">
              <img src={logo} alt="John Lewis & Partners" className="h-8 w-[170px]" />

              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-[298px] items-center gap-8 border-b-[0.5px] border-ink focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ink"
              >
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder="Get latest offers to your inbox"
                  className="min-w-0 flex-1 bg-transparent text-base leading-[1.6] font-medium tracking-[0.01em] outline-none placeholder:text-[#787A7C]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-[52px] shrink-0 items-center justify-center rounded-lg bg-ink text-white hover:bg-charcoal"
                >
                  <ChevronRightIcon />
                </button>
              </form>
            </div>

            <ul className="flex gap-4">
              {socialLinks.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full bg-white text-[#121212] hover:bg-surface-selected"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-[repeat(2,minmax(0,134px))] gap-x-6 gap-y-[25px] min-[375px]:gap-x-[58px] lg:flex lg:gap-[120px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex w-full flex-col gap-4 lg:w-[134px]">
                <h2 className="text-lg leading-6 font-medium lg:text-sm lg:font-semibold">{column.title}</h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a className="text-sm leading-[22px] hover:underline">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-[72px]">
          <Divider />
          <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-[22px] text-[#3E3E59]">© John Lewis plc 2001 - 2024</p>

            <div className="flex gap-4 self-end text-sm leading-6 font-medium sm:self-auto lg:gap-8">
              <Dropdown
                anchor="top end"
                selected={language}
                buttonClassName="flex items-center gap-2"
                button={
                  <>
                    <UsFlagIcon />
                    <span className="flex items-center gap-0.5">
                      {language}
                      <ChevronDownIcon width="18" height="18" />
                    </span>
                  </>
                }
                items={languages.map((name) => ({ label: name, onSelect: () => setLanguage(name) }))}
              />
              <Dropdown
                anchor="top end"
                selected={currency}
                buttonClassName="flex items-center gap-0.5"
                button={
                  <>
                    {currency}
                    <ChevronDownIcon width="18" height="18" />
                  </>
                }
                items={currencies.map((name) => ({ label: name, onSelect: () => setCurrency(name) }))}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
