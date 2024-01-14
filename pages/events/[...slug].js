import { useRouter } from "next/router";
import { getFilteredEvents } from "./../../dummy-data";
import EventList from "./../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/ui/error-alert";
export default function FilteredEventPage() {
  const router = useRouter();
  const FilterData = router.query.slug;
  if (!FilterData) {
    return <p className="center">Loading...</p>;
  }
  const filteredYear = FilterData[0];
  const filteredMonth = FilterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2025 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const event = getFilteredEvents({ year: numYear, month: numMonth });
  if (!event || event.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  return (
    <div>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList items={event} />
    </div>
  );
}
