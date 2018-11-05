declare interface Navigator {
  clipboard: {
    readText(): Promise<string>;
    writeText(text: string): Promise<string>;
  };
}
declare var Fingerprint2: any;
declare var idb: any;
