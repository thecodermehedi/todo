import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
 return (
  <section className="min-h-[90dvh] sm:min-h-[90svh] md:min-h-[90vh] lg:min-h-[90lvh] xl:min-h-[90lvh] 2xl:min-h-[90lvh] w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
   {children}
  </section>
 );
};

export default Container;
