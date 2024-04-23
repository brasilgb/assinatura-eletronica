'use client';
import React from 'react';
import Profile from '../profile';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {};

const Header = (props: Props) => {
  return (
    <header
      className={`bg-solar-blue-primary px-2`}
    >
      <div className="container py-1 mx-auto flex items-center justify-between h-16">
        <div
          className={`flex items-center w-28 p-0.5`}
        >
          <Link href='http://portal.gruposolar.com.br/'>
            <Image
              layout="responsive"
              src={`/assinatura-eletronica/logo/logo_solar.png`}
              width={120}
              height={40}
              alt={''}
            />
          </Link>
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
