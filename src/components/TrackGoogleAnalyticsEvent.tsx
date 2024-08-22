import React from "react";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";

const TrackGoogleAnalyticsEvent = (
  event_name: any,
  category: any,
  label: any,
  data: any
) => {
  let event_params = {
    category,
    label,
    ...data,
    value: data.mealAmount || data.subscriptionAmount,
  };
  // Send GA4 Event
  ReactGA.event(event_name, event_params);

  TagManager.dataLayer({
    dataLayer: {
      event: "event",
      eventProps: {
        category: category,
        action: event_name,
        label: label,
        value: data.mealAmount || data.subscriptionAmount || 0,
      },
    },
  });
};

export default TrackGoogleAnalyticsEvent;
