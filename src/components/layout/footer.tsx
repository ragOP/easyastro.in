export default function Footer() {
    return (
        <footer className="py-6 bg-card border-t border-primary/10">
            <div className="container mx-auto text-center text-sm text-foreground/60">
                <p>&copy; {new Date().getFullYear()} Soulmate Vision. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
