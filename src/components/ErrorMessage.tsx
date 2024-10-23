import { SuccessResponse } from "../types/Response.types";

  const ErrorMessage = ({ fieldName,response }: { fieldName: string,response:SuccessResponse }) => {
    return response && response.success === false && response.field === fieldName ? (
      <div className="text-sm text-red-500 flex items-center mt-2 gap-1">
        <svg className="w-5" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#EF4444">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="add" fill="#EF4444" transform="translate(42.666667, 42.666667)">
              <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" />
            </g>
          </g>
        </svg>
        <h4>{response.message}</h4>
      </div>
    ) : null;
  };
  export default ErrorMessage;
  
