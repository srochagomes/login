import NextLink from 'next/link';
import { ReactNode } from 'react';

interface Props {
    children?: string,
    href: string;
}

export default function Link({ children, href, ...props}:Props) {
    return (
        <NextLink href={href} passHref>
            {children}
        </NextLink>
    );
}