type UrlObject = {
  fileUrl: string;
};

export type DataResponse = {
  items: UrlObject[];
};

export type OutputJson = Record<string, (OutputJson | string)[]>;
