import { URL } from "url";
import { DataResponse, OutputJson } from "../types/response";
import { logger } from "../services/logger.service";

export class DataService {
  transform(data: DataResponse | null): OutputJson {
    const caller = `${this.constructor.name}.transform`;
    const transformedOutput: OutputJson = {};

    data?.items.forEach((item) => {
      try {
        const url = new URL(item.fileUrl);
        const hostName = url.hostname;
        const pathName = url.pathname;

        const isDirPath = pathName.endsWith("/");
        const paths = pathName.split("/").reduce<string[]>((acc, part) => {
          if (part) acc.push(part);
          return acc;
        }, []);

        if (!transformedOutput[hostName]) {
          transformedOutput[hostName] = [];
        }

        let current = transformedOutput[hostName];

        for (let i = 0; i < paths.length; i++) {
          const isLast = i === paths.length - 1;

          if (isLast && !isDirPath) {
            current.push(paths[i]);
            continue;
          }

          let found = current.find(
            (item) =>
              typeof item !== "string" &&
              Object.hasOwnProperty.call(item, paths[i]),
          );

          if (!found) {
            found = { [paths[i]]: [] };
            current.push(found);
          }

          current = found[paths[i]];
        }
      } catch (error) {
        logger.error(`Error transforming URL '${item.fileUrl}'`, error, caller);
      }
    });
    logger.log("URLs transformed", caller);

    return transformedOutput;
  }
}
