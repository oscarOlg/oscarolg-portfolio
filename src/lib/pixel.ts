// Meta Pixel tracking utilities
const PIXEL_ID = "302412685636304";

export const initPixel = () => {
  if (typeof window === "undefined") return;

  // Prevent duplicate initialization
  if ((window as any).fbq) return;

  const fbq = function () {
    (fbq as any).callMethod
      ? (fbq as any).callMethod.apply(fbq, Array.prototype.slice.call(arguments))
      : (fbq as any).queue.push(arguments);
  };

  (window as any).fbq = fbq;
  (fbq as any).push = fbq;
  (fbq as any).loaded = true;
  (fbq as any).version = "2.0";
  (fbq as any).queue = [];

  // Initialize pixel
  (window as any).fbq("init", PIXEL_ID);
  (window as any).fbq("track", "PageView");
};

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window === "undefined" || !(window as any).fbq) return;

  (window as any).fbq("track", eventName, eventData || {});
};

export const trackWhatsAppClick = (guideType: "portraits" | "weddings") => {
  trackEvent("Lead", {
    content_name: `Guide Download - ${guideType}`,
    content_type: "guide",
    value: guideType === "portraits" ? 100 : 200,
    currency: "MXN",
  });
};

export const trackGuideView = (guideName: string) => {
  trackEvent("ViewContent", {
    content_name: guideName,
    content_type: "guide",
  });
};

export const trackHomepageView = () => {
  trackEvent("ViewContent", {
    content_name: "Homepage",
    content_type: "homepage",
  });
};

export const trackServicesView = () => {
  trackEvent("ViewContent", {
    content_name: "Services",
    content_type: "services",
  });
};

export const trackPortfolioView = (portfolioCategory?: string) => {
  trackEvent("ViewContent", {
    content_name: portfolioCategory
      ? `Portfolio - ${portfolioCategory}`
      : "Portfolio",
    content_type: "portfolio",
  });
};

export const trackAboutView = () => {
  trackEvent("ViewContent", {
    content_name: "About",
    content_type: "about",
  });
};
