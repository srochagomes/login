import PrincipalHome from "@/view/screens/home/PrincipalHome";

import nextI18NextConfig from 'next-i18next.config.js'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


export async function getStaticProps({ locale }:any) {
    return {
        props: {
            ...(await serverSideTranslations(
              locale,
              ['common'],
              nextI18NextConfig
            )),
          },
        }
  }

export default PrincipalHome;

