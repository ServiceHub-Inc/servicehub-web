import PropTypes from "prop-types";
import React from "react";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import Image from "next/image";
import { SiSpinrilla } from "react-icons/si";
import transparentLogo from "../../public/images/logo-1.webp";

export const LoadingContext = React.createContext();
const BouncingLogo = () => (
  <div className="flex min-h-[200px] items-center transition-all duration-500">
    <div className="transition-all space-y-2 duration-500">
      <div className="animate-bounce text-center ">
        <Image src={transparentLogo} priority width={50} height={50} />
      </div>
      <div className="text-primary flex items-center space-x-2">
        <SiSpinrilla className="animate-spin " />
        <span className=" text-sm font-bold">Please Wait</span>
      </div>
    </div>
  </div>
);

export default function LoadingProvider({ children }) {
  const [pageLoading, setPageLoading] = React.useState(true);
  const [loaderOpacity, setLoaderOpacity] = React.useState(1);
  const router = useRouter();
  const handleRouteChangeStart = () => setPageLoading(true);
  const handleRouteChangeComplete = () => setPageLoading(false);
  React.useEffect(() => {
    setTimeout(() => {
      setLoaderOpacity(0.8);
      setPageLoading(false);
    }, 500);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router.events]);

  const Loader = React.useMemo(
    () => ({
      pageLoading,
      setPageLoading,
    }),
    [pageLoading]
  );
  return (
    <LoadingContext.Provider value={Loader}>
      <LoadingOverlay
        overlayOpacity={loaderOpacity}
        transitionDuration={500}
        loader={<BouncingLogo />}
        visible={pageLoading}
      />
      {loaderOpacity === 1 ? null : children}
    </LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
