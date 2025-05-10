export default function Pin({ color = '#e74c3c', size = 32 }) {
    return (
        <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ transform: 'translateY(-100%)' }}
        >
        <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill={color}
            stroke="#fff"
            strokeWidth="1"
        />
        <circle cx="12" cy="9" r="2.5" fill="#fff" />
        </svg>
    );
}
