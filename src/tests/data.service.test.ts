import { DataService } from "../services/data.service";
import { logger } from "../services/logger.service";

jest.mock("../services/logger.service");

describe("DataService", () => {
  const dataService = new DataService();

  it("should transform data correctly", () => {
    const mockData = {
      items: [
        { fileUrl: "http://34.8.32.234:48183/SvnRep/ADV-H5-New/README.txt" },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/ADV-H5-New/VisualSVN.lck" },
        {
          fileUrl: "http://34.8.32.234:48183/SvnRep/ADV-H5-New/hooks-env.tmpl",
        },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/AT-APP/README.txt" },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/AT-APP/VisualSVN.lck" },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/AT-APP/hooks-env.tmpl" },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/README.txt" },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/VisualSVN.lck" },
        { fileUrl: "http://34.8.32.234:48183/SvnRep/hooks-env.tmpl" },
        { fileUrl: "http://34.8.32.234:48183/www/README.txt" },
        { fileUrl: "http://34.8.32.234:48183/www/VisualSVN.lck" },
        { fileUrl: "http://34.8.32.234:48183/www/hooks-env.tmpl" },
      ],
    };

    const expectedOutput = {
      "34.8.32.234": [
        {
          SvnRep: [
            {
              "ADV-H5-New": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
            },
            {
              "AT-APP": ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
            },
            "README.txt",
            "VisualSVN.lck",
            "hooks-env.tmpl",
          ],
        },
        {
          www: ["README.txt", "VisualSVN.lck", "hooks-env.tmpl"],
        },
      ],
    };

    const result = dataService.transform(mockData);

    expect(result).toEqual(expectedOutput);
    expect(logger.log).toHaveBeenCalledWith(
      "URLs transformed",
      "DataService.transform",
    );
  });

  it("should handle invalid URLs gracefully", () => {
    const mockData = {
      items: [
        { fileUrl: "http://validurl.com/path/to/resource" },
        { fileUrl: "not_a_valid_url" },
      ],
    };
    const expectedOutput = {
      "validurl.com": [
        {
          path: [{ to: ["resource"] }],
        },
      ],
    };

    const result = dataService.transform(mockData);

    expect(result).toEqual(expectedOutput);
    expect(logger.error).toHaveBeenCalled(); // https://stackoverflow.com/questions/75508376/jest-does-not-recognize-typeerror-thrown-by-url-constructor
  });
});
