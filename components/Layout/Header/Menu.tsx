import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { DisclosureState } from 'ariakit';
import { Menu, MenuItem } from '~/components/NestedMenu';
import { useIsMounted, useWindowSize } from '~/hooks';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { formatAddress } from '~/utils/address';
import { chainDetails } from '~/utils/network';
import { useAccount, useNetwork } from 'wagmi';
import defaultImage from '~/public/empty-token.webp';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function HeaderMenu({ walletDialog }: { walletDialog: DisclosureState }) {
  const [{ data: accountData }] = useAccount();

  const { setTheme, resolvedTheme } = useTheme();

  const isMounted = useIsMounted();

  const isDark = resolvedTheme === 'dark';

  const address = accountData ? formatAddress(accountData.address) : null;

  const [{ data: networkData }, switchNetwork] = useNetwork();

  const chain = networkData.chain;

  const mainnets = networkData.chains.filter((chain) => !chain.testnet);

  const size = useWindowSize();

  const isMaxWidthSm = size && size.width && size.width < 640;

  const isMaxWidthLg = size && size.width && size.width < 1024;

  const t = useTranslations('Common');

  return (
    <Menu
      label={
        <>
          <span className="sr-only">{t('menu')}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </>
      }
    >
      {address ? (
        <MenuItem
          label={
            <div className="flex flex-col gap-1 p-2">
              <span className="text-xs text-neutral-500">{t('connectedAs')}</span>
              <p className="font-normal text-lp-gray-2 outline-none active-item:text-black aria-disabled:opacity-40">
                {address}
              </p>
            </div>
          }
          className="md:hidden"
          onClick={walletDialog.toggle}
        />
      ) : (
        <MenuItem label={t('connectWallet')} className="break-words p-2 md:hidden" onClick={walletDialog.toggle} />
      )}

      {networkData && chain && switchNetwork && isMaxWidthSm && (
        <Menu
          label={chain?.name ?? t('unsupported')}
          className="flex items-center justify-between p-2 font-normal text-lp-gray-2 outline-none active-item:text-black aria-disabled:opacity-40 sm:hidden"
        >
          {mainnets.map((value) => {
            const { network } = chainDetails(value?.id?.toString());
            return (
              <MenuItem
                key={value.id}
                label={
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center rounded-full">
                      <Image
                        src={network?.logoURI ?? defaultImage}
                        alt={t('logoAlt', { name: value.name })}
                        objectFit="contain"
                        width="20px"
                        height="20px"
                        priority
                      />
                    </div>
                    <span className="whitespace-nowrap">{value.name}</span>
                  </div>
                }
                onClick={() => switchNetwork(value.id)}
              />
            );
          })}
        </Menu>
      )}

      {isMaxWidthLg && (
        <>
          <Menu label="Salaries">
            <MenuItem label={<Link href="/">Streams</Link>} />
            <MenuItem label={<Link href="/create">Create</Link>} />
            <MenuItem label={<Link href="/withdraw">Withdraw</Link>} />
          </Menu>

          <Menu label="Vesting">
            <MenuItem label={<Link href="/vesting">Streams</Link>} />
            <MenuItem label={<Link href="/vesting/create">Create</Link>} />
          </Menu>

          <Menu label="Payments">
            <MenuItem label={<Link href="/payments">Streams</Link>} />
            <MenuItem label={<Link href="/payments/create">Create</Link>} />
          </Menu>

          <Menu label="Token Salaries">
            <MenuItem label={<Link href="/token-salaries/incoming">Incoming</Link>} />
            <MenuItem label={<Link href="/token-salaries/outgoing">Outgoing</Link>} />
            <MenuItem label={<Link href="/token-salaries/create">Create</Link>} />
          </Menu>
        </>
      )}

      {isMounted && isMaxWidthLg && (
        <MenuItem
          label={
            <>
              <span className="cursor-pointer">{isDark ? t('lightTheme') : t('darkTheme')}</span>
              {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </>
          }
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        />
      )}
    </Menu>
  );
}
