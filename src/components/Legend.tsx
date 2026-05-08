export function Legend({ color, label }: { color: string; label: string; }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
                style={{
                    width: 16,
                    height: 16,
                    background: color,
                    borderRadius: 4,
                }} />
            <span>{label}</span>
        </div>
    );
}
