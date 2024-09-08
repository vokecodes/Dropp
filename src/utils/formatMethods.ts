export const formatBusinessNameLink = (name: string) => {
  // const splitName = name.split(" ");
  // let empArr = [];

  // for (let index = 0; index < splitName.length; index++) {
  //   let element = splitName[index];
  //   if (element.match(/\W/)?.[0] === "-") {
  //     element = element.split("-").join("");
  //   }
  //   empArr.push(element);
  // }

  // return empArr.join("-");
  return name?.split(" ").join("-");
};

export const formatPrice = (price: any) => {
  return price ? parseInt(price).toLocaleString() : "0.00";
};

// HANDLE PHONE NUMBER

export const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.name === "phoneNumber") {
    e.target.maxLength = 11;
    let val = e.target.value.replace(/\D/g, "");
    e.target.value = val;
  }
};

export const handleKeyboardPhoneNumber: React.KeyboardEventHandler<
  HTMLInputElement
> = (e) => {
  if (e.currentTarget.name === "whatsAppNumber") {
    e.currentTarget.maxLength = 11;
    let val = e.currentTarget.value.replace(/\D/g, "");
    e.currentTarget.value = val;
  }
};

// Format remote amount
export const formatRemoteAmountKobo = (amount: any) => {
  let amountKobo = {
    naira: "₦0",
    kobo: ".00",
  };

  if (!amount) {
    return amountKobo;
  }

  // const dividedAmount = amount / 100;

  const formattedAmount = amount.toFixed(2);

  const [naira, kobo] = formattedAmount.split(".");

  // console.log(naira, kobo);

  if (!naira) {
    return amountKobo;
  }

  amountKobo = {
    naira: "₦" + parseInt(naira).toLocaleString(),
    kobo: kobo ? "." + kobo : kobo || ".00",
  };

  return amountKobo;
};


// Format remote amount
export const formatRemoteAmountDollar = (amount: any) => {
  let amountCents = {
    dollar: "$0",
    cents: ".00",
  };

  if (!amount) {
    return amountCents;
  }

  // const dividedAmount = amount / 100;

  const formattedAmount = amount.toFixed(2);

  const [dollar, cents] = formattedAmount.split(".");

  // console.log(naira, kobo);

  if (!dollar) {
    return amountCents;
  }

  amountCents = {
    dollar: "$" + parseInt(dollar).toLocaleString(),
    cents: cents ? "." + cents : cents || ".00",
  };

  return amountCents;
};

export const COMMON_DATE_FORMAT = "MMM DD, YYYY";

export const truncateText = (str: any, max: any, len: any) => {
  return str.length > max ? str.substring(0, len) + "..." : str;
};
