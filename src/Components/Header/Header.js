import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-theme-cream-white-default">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="hidden lg:flex lg:gap-x-12">
            <Link href="/for-you" className="-m-1.5 p-1.5 text-sm font-semibold leading-6 text-theme-navy-blue">
                For You
            </Link>
            <Link href="/community" className="-m-1.5 p-1.5 text-sm font-semibold leading-6 text-theme-navy-blue">
                Community
            </Link>
        </div>
        <div className="flex justify-center">
            <Link href="/" className="text-sm font-semibold leading-6 text-theme-navy-blue">
                The Breaking Yous
            </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:justify-end">
          <Link href="/log-in" className="text-sm font-semibold leading-6 text-theme-navy-blue">
            Log in
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-theme-cream-white-default px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 text-theme-navy-blue">
                The Breaking Yous
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-theme-navy-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-theme-navy-blue">
              <div className="space-y-2 py-6">
                <Link
                  to="/for-you"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-theme-navy-blue hover:bg-theme-cream-white-light"
                >
                  For You
                </Link>
                <Link
                  to="/community"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-theme-navy-blue hover:bg-theme-cream-white-light"
                >
                  Community
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="/log-in"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-theme-navy-blue hover:bg-theme-cream-white-light"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}