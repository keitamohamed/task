
interface Props {
    width: string,
    color: string | null;
}

const Logo = (props: Props) => {

    return (
        <svg height="100%" stroke-miterlimit="10"
             fillRule={'nonzero'} clipRule={'evenodd'} strokeLinecap={'round'} strokeLinejoin={'round'} version="1.1"
             viewBox="0 0 230.271 78.9681" width={props.width ? props.width : '100%'} xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"
             xmlns-vectornator="http://vectornator.io" xmlnsXlink="http://www.w3.org/1999/xlink">
            <defs>
                <clipPath id="TextBounds">
                    <rect height="82.3038" width="230.271" x="0" y="-3.33568"/>
                </clipPath>
            </defs>
            <g id="Layer-1" vectornator-layerName="Layer 1">
                <g fill={props.color ? props.color : '#000000'} opacity="1" stroke="none">
                    <path clip-path="url(#TextBounds)"
                          d="M44.9489 16.5177L44.9489 19.5754L27.8822 19.5754L27.8822 63.6643L19.9533 63.6643L19.9533 19.5754L2.88667 19.5754L2.88667 16.5177L44.9489 16.5177Z"
                          fill-rule="evenodd"/>
                    <path clip-path="url(#TextBounds)"
                          d="M75.3489 63.6643C74.4007 63.1902 73.6007 62.5206 72.9489 61.6554C72.297 60.7902 71.9711 59.8006 71.9711 58.6865C71.1178 59.3265 70.2822 59.9902 69.4644 60.6777C68.6467 61.3651 67.7578 61.9873 66.7978 62.5443C65.8378 63.1014 64.7711 63.5577 63.5978 63.9132C62.4244 64.2688 61.0674 64.4465 59.5267 64.4465C58.1044 64.4465 56.8185 64.2154 55.6689 63.7532C54.5193 63.291 53.5474 62.6569 52.7533 61.851C51.9593 61.0451 51.343 60.0851 50.9044 58.971C50.4659 57.8569 50.2467 56.6599 50.2467 55.3799C50.2467 53.8154 50.5548 52.4051 51.1711 51.1488C51.7874 49.8925 52.6348 48.7725 53.7133 47.7888C54.7919 46.8051 56.0422 45.928 57.4644 45.1577C58.8867 44.3873 60.4037 43.6999 62.0156 43.0954C63.6274 42.491 65.2867 41.9517 66.9933 41.4777C68.7 41.0036 70.3593 40.5651 71.9711 40.1621L71.9711 37.8865C71.9711 36.2273 71.8526 34.8288 71.6156 33.691C71.3785 32.5532 71.0111 31.6347 70.5133 30.9354C70.0156 30.2362 69.3815 29.7384 68.6111 29.4421C67.8407 29.1458 66.9222 28.9977 65.8556 28.9977C64.8363 28.9977 63.9 29.1991 63.0467 29.6021C62.1933 30.0051 61.4407 30.5443 60.7889 31.2199C60.137 31.8954 59.6037 32.6895 59.1889 33.6021C58.7741 34.5147 58.4956 35.4806 58.3533 36.4999L51.74 36.4999C51.9296 34.9354 52.4689 33.5369 53.3578 32.3043C54.2467 31.0717 55.3667 30.0347 56.7178 29.1932C58.0689 28.3517 59.6037 27.7058 61.3222 27.2554C63.0407 26.8051 64.8244 26.5799 66.6733 26.5799C69.0437 26.5799 71.0348 26.811 72.6467 27.2732C74.2585 27.7354 75.5504 28.3814 76.5222 29.211C77.4941 30.0406 78.1874 31.054 78.6022 32.251C79.017 33.448 79.2244 34.7695 79.2244 36.2154L79.2244 58.6865C79.2244 59.8006 79.5504 60.7902 80.2022 61.6554C80.8541 62.5206 81.6541 63.1902 82.6022 63.6643L75.3489 63.6643ZM71.9711 42.4732C70.9281 42.8051 69.8496 43.1843 68.7356 43.611C67.6215 44.0377 66.5311 44.5177 65.4644 45.051C64.3978 45.5843 63.3785 46.1591 62.4067 46.7754C61.4348 47.3917 60.5815 48.0554 59.8467 48.7665C59.1119 49.4777 58.5311 50.2243 58.1044 51.0065C57.6778 51.7888 57.4644 52.6065 57.4644 53.4599C57.4644 54.3606 57.6304 55.208 57.9622 56.0021C58.2941 56.7962 58.7326 57.4954 59.2778 58.0999C59.823 58.7043 60.4511 59.1784 61.1622 59.5221C61.8733 59.8658 62.6081 60.0377 63.3667 60.0377C64.1726 60.0377 64.943 59.931 65.6778 59.7177C66.4126 59.5043 67.1237 59.214 67.8111 58.8465C68.4985 58.4791 69.1859 58.0584 69.8733 57.5843C70.5607 57.1102 71.26 56.6006 71.9711 56.0554L71.9711 42.4732Z"
                          fill-rule="evenodd"/>
                    <path clip-path="url(#TextBounds)"
                          d="M101.909 61.9221C102.881 61.9221 103.781 61.774 104.611 61.4777C105.441 61.1814 106.158 60.7843 106.762 60.2865C107.367 59.7888 107.835 59.214 108.167 58.5621C108.499 57.9102 108.664 57.2406 108.664 56.5532C108.664 55.4391 108.386 54.4673 107.829 53.6377C107.272 52.808 106.537 52.0673 105.624 51.4154C104.712 50.7636 103.675 50.1651 102.513 49.6199C101.352 49.0747 100.167 48.5117 98.9578 47.931C97.7489 47.3502 96.5637 46.734 95.4022 46.0821C94.2407 45.4302 93.2037 44.6658 92.2911 43.7888C91.3785 42.9117 90.6437 41.8984 90.0867 40.7488C89.5296 39.5991 89.2511 38.254 89.2511 36.7132C89.2511 35.2673 89.5593 33.9221 90.1756 32.6777C90.7919 31.4332 91.6511 30.3606 92.7533 29.4599C93.8556 28.5591 95.1652 27.854 96.6822 27.3443C98.1993 26.8347 99.8585 26.5799 101.66 26.5799C102.869 26.5799 103.995 26.6628 105.038 26.8288C106.081 26.9947 107.106 27.3147 108.113 27.7888C109.121 28.2628 110.122 28.9443 111.118 29.8332C112.113 30.7221 113.168 31.8777 114.282 33.2999L111.616 35.6821C110.241 33.4302 108.706 31.7532 107.011 30.651C105.316 29.5488 103.509 28.9977 101.589 28.9977C100.546 28.9977 99.5978 29.1221 98.7444 29.371C97.8911 29.6199 97.1622 29.9636 96.5578 30.4021C95.9533 30.8406 95.4793 31.3562 95.1356 31.9488C94.7919 32.5414 94.62 33.1695 94.62 33.8332C94.62 34.9236 94.9222 35.8717 95.5267 36.6777C96.1311 37.4836 96.9311 38.2125 97.9267 38.8643C98.9222 39.5162 100.054 40.1147 101.322 40.6599C102.59 41.2051 103.882 41.7621 105.198 42.331C106.513 42.8999 107.805 43.5162 109.073 44.1799C110.341 44.8436 111.473 45.608 112.469 46.4732C113.464 47.3384 114.264 48.3399 114.869 49.4777C115.473 50.6154 115.776 51.9428 115.776 53.4599C115.776 55.0006 115.491 56.4406 114.922 57.7799C114.353 59.1191 113.494 60.2806 112.344 61.2643C111.195 62.248 109.755 63.0243 108.024 63.5932C106.294 64.1621 104.256 64.4465 101.909 64.4465C100.842 64.4465 99.7459 64.3636 98.62 64.1977C97.4941 64.0317 96.3622 63.7058 95.2244 63.2199C94.0867 62.734 92.9489 62.0525 91.8111 61.1754C90.6733 60.2984 89.5593 59.1488 88.4689 57.7265L91.42 55.0599C92.297 56.2925 93.1385 57.3414 93.9444 58.2065C94.7504 59.0717 95.5741 59.7828 96.4156 60.3399C97.257 60.8969 98.1222 61.2999 99.0111 61.5488C99.9 61.7977 100.866 61.9221 101.909 61.9221Z"
                          fill-rule="evenodd"/>
                    <path clip-path="url(#TextBounds)"
                          d="M132.558 41.9399L150.833 27.2554L155.527 27.2554L139.207 40.5177L159.367 63.6643L149.838 63.6643L132.558 43.7532L132.558 63.6643L125.304 63.6643L125.304 10.7577L130.496 8.69543L132.558 8.69543L132.558 41.9399Z"
                          fill-rule="evenodd"/>
                    <path clip-path="url(#TextBounds)"
                          d="M165.411 28.6421L170.496 26.5799L172.593 26.5799L172.593 63.6643L165.411 63.6643L165.411 28.6421ZM164.842 13.3177C164.842 12.7488 164.949 12.2154 165.162 11.7177C165.376 11.2199 165.672 10.7814 166.051 10.4021C166.43 10.0228 166.869 9.72654 167.367 9.51321C167.864 9.29988 168.398 9.19321 168.967 9.19321C169.536 9.19321 170.069 9.29988 170.567 9.51321C171.064 9.72654 171.503 10.0228 171.882 10.4021C172.261 10.7814 172.558 11.2199 172.771 11.7177C172.984 12.2154 173.091 12.7488 173.091 13.3177C173.091 13.8865 172.984 14.4199 172.771 14.9177C172.558 15.4154 172.261 15.854 171.882 16.2332C171.503 16.6125 171.064 16.9088 170.567 17.1221C170.069 17.3354 169.536 17.4421 168.967 17.4421C168.398 17.4421 167.864 17.3354 167.367 17.1221C166.869 16.9088 166.43 16.6125 166.051 16.2332C165.672 15.854 165.376 15.4154 165.162 14.9177C164.949 14.4199 164.842 13.8865 164.842 13.3177Z"
                          fill-rule="evenodd"/>
                    <path clip-path="url(#TextBounds)"
                          d="M201.287 64.4465C198.821 64.4465 196.504 63.9843 194.336 63.0599C192.167 62.1354 190.276 60.8791 188.664 59.291C187.053 57.7028 185.779 55.8362 184.842 53.691C183.906 51.5458 183.438 49.2643 183.438 46.8465C183.438 43.931 183.864 41.2347 184.718 38.7577C185.571 36.2806 186.78 34.1414 188.344 32.3399C189.909 30.5384 191.787 29.128 193.98 28.1088C196.173 27.0895 198.62 26.5799 201.322 26.5799C203.693 26.5799 205.873 27.0006 207.864 27.8421C209.856 28.6836 211.568 29.8095 213.002 31.2199C214.436 32.6302 215.55 34.2599 216.344 36.1088C217.139 37.9577 217.536 39.8895 217.536 41.9043L190.407 41.9043C190.407 44.3458 190.721 46.6095 191.349 48.6954C191.977 50.7814 192.86 52.5828 193.998 54.0999C195.136 55.6169 196.487 56.8021 198.051 57.6554C199.616 58.5088 201.334 58.9354 203.207 58.9354C204.771 58.9354 206.276 58.6806 207.722 58.171C209.168 57.6614 210.478 56.9917 211.651 56.1621C212.824 55.3325 213.826 54.3843 214.656 53.3177C215.485 52.251 216.066 51.1488 216.398 50.011L218.496 50.9354C217.974 52.808 217.133 54.5621 215.971 56.1977C214.81 57.8332 213.453 59.2614 211.9 60.4821C210.347 61.7028 208.659 62.6688 206.833 63.3799C205.008 64.091 203.159 64.4465 201.287 64.4465ZM208.469 38.9888C208.469 37.614 208.226 36.334 207.74 35.1488C207.254 33.9636 206.584 32.9384 205.731 32.0732C204.878 31.208 203.882 30.5265 202.744 30.0288C201.607 29.531 200.386 29.2821 199.082 29.2821C197.992 29.2821 196.949 29.5251 195.953 30.011C194.958 30.4969 194.069 31.1725 193.287 32.0377C192.504 32.9028 191.859 33.928 191.349 35.1132C190.839 36.2984 190.537 37.5784 190.442 38.9532L208.469 38.9888Z"
                          fill-rule="evenodd"/>
                </g>
            </g>
        </svg>
    )
}

export default Logo