const DisplayStats = ({
  companyProfile,
  stockInfo,
  peers,
  setInput,
  onSubmit,
}) => {
  return (
    <div>
      <div>{companyProfile.ticker}</div>
      <div>{companyProfile.name}</div>
      <div>Current Price: {stockInfo.c}</div>
      <div>Previous Close: {stockInfo.pc}</div>
      <div>Todays Open: {stockInfo.o}</div>
      <div>Todays High: {stockInfo.o}</div>
      <div>Todays Low: {stockInfo.o}</div>
      <h3>Similar Companies</h3>
      {peers.slice(0, 3).map((item, index) => {
        return (
          <div
            onClick={(e) => {
              setInput(item);
              onSubmit(e, item);
            }}
            key={index}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default DisplayStats;
