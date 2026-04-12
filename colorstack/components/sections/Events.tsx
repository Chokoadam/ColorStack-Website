export default function Events() {

    // event requirements: 
    // 
    return (
        <div className="w-full h-screen flex flex-col gap-16">
            <h1 className="underline underline-offset-8 text-xl font-inter"> Upcoming Events </h1>
            <iframe 
                title="Google Calendar" 
                src="https://calendar.google.com/calendar/embed?src=aa9a103be92a0cedc650df8f8a8931357f3c988b0d8faf7120d3cc17b6f37eeb%40group.calendar.google.com&ctz=America%2FChicago&showTitle=0&showPrint=0&showTz=0&showCalendars=0" 
                className="w-full h-full border-0 invert hue-rotate-180"
            />
        </div>
    );
}