export interface IBaseResponse {
  motd: {
    msg: string;
    url: string;
  };
  /**
   * @type {boolean}
   * @description true if the request was successful.
   * @example true
   */
  success: boolean;
}

export type OmitResponse<T extends IBaseResponse> = Omit<T, 'motd'>;
