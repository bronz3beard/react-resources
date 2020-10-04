// import moment from "moment";

export const getUrl = () => {
  const currentURL = window.location.pathname.split("/")[1];
  return `/${currentURL}`;
};

export const isClientSide = () => typeof window !== "undefined";

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const scrollToComponent = (ref) => {
  if (isClientSide()) {
    const isSmoothScrollSupported =
      "scrollBehavior" in document.documentElement.style;
    if (isSmoothScrollSupported && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      ref.current && ref.current.scrollIntoView(false);
    }
  }
};

export const dataFilter = (dataArray, filterValue, filterOnValue = null) => {
  const lowercaseFilter = !filterValue
    ? ""
    : filterValue.toString().toLowerCase();

  return dataArray.filter((item) =>
    Object.keys(item).some((key) => {
      const keyValue = !filterOnValue ? item[key] : item[filterOnValue];

      if (keyValue) {
        return (
          keyValue.toString().toLowerCase().indexOf(lowercaseFilter) !== -1 ||
          !lowercaseFilter
        );
      }
      return null;
    })
  );
};

export const sortArrayOfObjectsByField = (
  arrayToSort,
  field,
  order = "desc"
) => {
  const orderValue = order === "desc" ? 1 : -1;
  const sortedArray = arrayToSort.sort(
    (a, b) =>
      (a.field[field] < b.field[field]
        ? 1
        : a.field[field] > b.field[field]
        ? -1
        : 0) * orderValue
  );
  return sortedArray;
};

export const arraySort = (array, sortOrder = { key: "asc" }) => {
  const orderSort = sortOrder.key === "asc" ? "desc" : "asc";
  const arraySorted = array.sort((a, b) =>
    orderSort === "asc"
      ? a[sortOrder.key] > b[sortOrder.key]
      : b[sortOrder.key] > a[sortOrder.key]
  );
  return arraySorted;
};

// The modern version of the Fisher–Yates shuffle
export const arrayshuffle = (array) => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getUcFirst = (value) =>
  `${value[0].toUpperCase()}${value.slice(1)}`;

export const firstCharacterToUpperCaseAndSpacesForDivision = (
  theString,
  originalDivision
) => {
  const arrayOfString = theString.split(originalDivision);
  const arrayPascalCase = arrayOfString.map(
    (word) => `${word[0].toUpperCase()}${word.substring(1, word.length)}`
  );
  return arrayPascalCase.join(" ");
};

// capitalises first character of each word
export const capitaliseFirstCharacter = (stringValue) =>
  stringValue.replace(/\b([a-z\s])/g, (string) => string.toUpperCase());

// capitalizes entire word
export const capitaliseString = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(/\b([a-z\s]+)/g, replaceValue.toUpperCase())
    : stringValue.replace(/\b([a-z]*)/g, (string) => string.toUpperCase());

// removes special characters on standard en-us keyboard config
export const removeSpecialCharacters = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(
        /[+,:;=?@#|'"‘’<>.^*%!-._\\\/`~\[\]\{\}]+/g,
        replaceValue
      )
    : stringValue.replace(/[+,:;=?@#|'"‘’<>.^*%!-._\\\/`~\[\]\{\}]*/g, "");

// removes all numbers in a string
export const removeNumbers = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(/[0-9\s]+/g, replaceValue)
    : stringValue.replace(/[0-9]*/g, "");

// returns only the number in a string removing letters and special characters
export const getOnlyNumbers = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(
        /[a-zA-Z$&+,:;=?@#|'"‘’<>.^*()%!-._\\\/`~\[\]\{\}]+/g,
        replaceValue
      )
    : stringValue.replace(
        /[a-zA-Z$&+,:;=?@#|'"‘’<>.^*()%!-._\\\/`~\[\]\{\}]*/g,
        ""
      );

// replace whitespace with any character or no space
export const replaceWhiteSpace = (stringValue, replaceValue) =>
  replaceValue
    ? stringValue.replace(/[\s]/g, replaceValue)
    : stringValue.replace(/[\s]+/g, "");

// export const formatDate = (
//   DateTimeStamp,
//   format = "dddd Do MMMM YYYY h:mma",
//   withUtc = null
// ) => {
//   const utcDate = moment.utc(DateTimeStamp).format("YYYY-MM-DD HH:mm:ss");
//   const stillUtc = moment.utc(utcDate).toDate();
//   const local = moment(!withUtc ? stillUtc : DateTimeStamp)
//     .local()
//     .format("YYYY-MM-DD HH:mm:ss");
//   const DATE_FORMATS = {
//     day: "dddd",
//     time: "h:mma",
//     searchTime: "h:00a",
//     dateTime: "DD/MM/YYYY HH:mma", // 'Do, h:mma',
//     shortDateOnly: "DD-MM-YYYY",
//     dateNoTime: "dddd Do MMMM YYYY",
//     dateTimeServer: "YYYY-MM-DD HH:mm:ss",
//   };

//   return moment(local).format(DATE_FORMATS[format] || format);
// };

// disable past dates :: Not tested
// const yesterday = moment().subtract(1, "day");
// export const disablePastDates = (current) => {
//   console.log("disablePastDates -> current", current);
//   return current.isAfter(yesterday);
// };

// export const sortDates = (dates) => {
//   const sortedDatesArray = dates.sort(
//     (a, b) => formatDate(a.dt_txt) - formatDate(b.dt_txt)
//   );

//   return sortedDatesArray;
// };

// find and replace html element - WIP
export const replaceHtmlElement = (stringValue, element, replaceValue) =>
  stringValue.replace(
    `/<${element}(?:'[^']*'['']*|'[^']*'['']*|[^''>])+>([\w\d\s:,°.-]*)/g`,
    replaceValue
  );

// check if object is empty.
export const isEmpty = (obj, item = null) => {
  if (!item) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  } else {
    if (!obj[item]) {
      return true;
    }
    return false;
  }
};

export const reactSelectOptions = (
  optionsArray,
  value,
  label,
  concatParam = null,
  stringFunction
) => {
  return optionsArray.map((item) => {
    const optionItems = {};

    const labelValue = !concatParam
      ? item[label]
      : `${item[label]} ${item[concatParam]}`;

    optionItems.value = item[value];
    optionItems.label = !stringFunction
      ? labelValue
      : stringFunction(labelValue);

    return optionItems;
  });
};

export const getUniqueArrayObjects = (
  array,
  objectKey,
  foreignObjectKey = null
) => {
  const uniqueValues = !foreignObjectKey
    ? array.filter(
        (value, index, self) =>
          self.map((item) => item[objectKey]).indexOf(value[objectKey]) ===
          index
      )
    : array.filter((value, index, self) =>
        self
          .map((item) => item[objectKey] && item[foreignObjectKey])
          .indexOf(
            value[objectKey] === index && value[foreignObjectKey] === index
          )
      );

  return uniqueValues;
};

export const getUniqueArrayValues = (value, index, self) => {
  return self.indexOf(value) == index;
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const val = item[key];
    groups[val] = groups[val] || [];
    groups[val].push(item);

    return groups;
  }, {});
};

// not tested
export const arrayMergeByKey = (array1, array2, mergeKey) => {
  const x = array1.map((value) => ({
    ...array2.find((item) => item[mergeKey] === value[mergeKey] && item),
    ...value,
  }));

  console.log("mergeById -> x", x);
  return x;
};

export const arePropsEqual = (prevProps, nextProps) => {
  console.log("arePropsEqual -> nextProps", nextProps.fields);
  console.log("arePropsEqual -> prevProps", prevProps.fields);
  console.log(
    "arePropsEqual -> nextProps === prevProps",
    nextProps === prevProps
  );
  if (nextProps === prevProps) {
    return true;
  }
  return false;
  // return true if passing nextProps to render would return
  // the same result as passing prevProps to render,
  //   otherwise return false
};

export const expandSelected = (uniqueDataArray, rowData, value) => {
  uniqueDataArray.forEach((val) => {
    val.expanded = false;
  });
  rowData.expanded = !value ? true : value;
};
