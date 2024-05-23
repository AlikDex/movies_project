export type IconsId =
  | "angle-up"
  | "bars"
  | "calendar-days"
  | "circle-play"
  | "circle-stop"
  | "clock"
  | "eye"
  | "flag"
  | "heart"
  | "home"
  | "image"
  | "images"
  | "magnifying-glass"
  | "power-off"
  | "stop"
  | "tag"
  | "tags"
  | "thumbs-down"
  | "thumbs-up"
  | "xmark"
  | "youtube";

export type IconsKey =
  | "AngleUp"
  | "Bars"
  | "CalendarDays"
  | "CirclePlay"
  | "CircleStop"
  | "Clock"
  | "Eye"
  | "Flag"
  | "Heart"
  | "Home"
  | "Image"
  | "Images"
  | "MagnifyingGlass"
  | "PowerOff"
  | "Stop"
  | "Tag"
  | "Tags"
  | "ThumbsDown"
  | "ThumbsUp"
  | "Xmark"
  | "Youtube";

export enum Icons {
  AngleUp = "angle-up",
  Bars = "bars",
  CalendarDays = "calendar-days",
  CirclePlay = "circle-play",
  CircleStop = "circle-stop",
  Clock = "clock",
  Eye = "eye",
  Flag = "flag",
  Heart = "heart",
  Home = "home",
  Image = "image",
  Images = "images",
  MagnifyingGlass = "magnifying-glass",
  PowerOff = "power-off",
  Stop = "stop",
  Tag = "tag",
  Tags = "tags",
  ThumbsDown = "thumbs-down",
  ThumbsUp = "thumbs-up",
  Xmark = "xmark",
  Youtube = "youtube",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.AngleUp]: "61697",
  [Icons.Bars]: "61698",
  [Icons.CalendarDays]: "61699",
  [Icons.CirclePlay]: "61700",
  [Icons.CircleStop]: "61701",
  [Icons.Clock]: "61702",
  [Icons.Eye]: "61703",
  [Icons.Flag]: "61704",
  [Icons.Heart]: "61705",
  [Icons.Home]: "61706",
  [Icons.Image]: "61707",
  [Icons.Images]: "61708",
  [Icons.MagnifyingGlass]: "61709",
  [Icons.PowerOff]: "61710",
  [Icons.Stop]: "61711",
  [Icons.Tag]: "61712",
  [Icons.Tags]: "61713",
  [Icons.ThumbsDown]: "61714",
  [Icons.ThumbsUp]: "61715",
  [Icons.Xmark]: "61716",
  [Icons.Youtube]: "61717",
};
