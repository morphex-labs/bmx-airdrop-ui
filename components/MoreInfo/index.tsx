import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function MoreInfo({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (v: boolean) => void }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-[#334155]">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    More Info
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="mb-4 text-sm text-gray-500 dark:text-[#cecece]">
                      Through this interface, you're able to to bond USDC or wFTM for vested MPX. Treasury will use
                      bonded funds for protocol-owned liquidity, incentives, and operational budgets.
                    </p>
                    <p className="mb-2 text-sm text-gray-500 dark:text-[#cecece]">Bonding/Vesting terms:</p>
                    <p className="text-sm text-gray-500 dark:text-[#cecece]"> - Minimum bond amount: $500</p>
                    <p className="text-sm text-gray-500 dark:text-[#cecece]"> - Maximum bond amount: $5000</p>
                    <p className="text-sm text-gray-500 dark:text-[#cecece]"> - 60 days initial cliff</p>
                    <p className="mb-4 text-sm text-gray-500 dark:text-[#cecece]">
                      - 1 year linear vesting (starting from the cliff end)
                    </p>
                    <p className="mb-2 text-sm text-gray-500 dark:text-[#cecece]">
                      First, input the amount of USDC or wFTM you'd like to bond for MPX. Click "Approve" and then
                      "Bond". Keep in mind that once you've bonded, it can't be undone.
                    </p>
                    <p className="mb-2 text-sm text-gray-500 dark:text-[#cecece]">
                      Once you've approved and confirmed, a unique vesting contract will be created just for you.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#0029FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#2f51fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}