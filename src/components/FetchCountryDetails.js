export default async function fetchCountryDetails() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countryData = await response.json();
    const countryCodes = countryData.reduce((acc, country) => {
      acc[country.cca3] = country.name.common;
      return acc;
    }, {});
    const countriesDetails = countryData.reduce((acc, country) => {
      acc[country.name.common] = {
        name: country.name.common,
        population: country.population,
        populationString: country.population.toLocaleString("en-US"),
        area: country.area,
        region: country.region,
        capital: (country.capital || ["Not Found"])[0],
        flag: country.flags.svg,
        landlocked: country.landlocked,
        //for detail page
        nativeName: Object.values(
          country.name.nativeName || { common: "Not Found" }
        )[0].common,
        subregion: country.subregion,
        topLevelDomain: (country.tld || ["Not Found"])[0],
        currencies: Object.values(
          country.currencies || { name: "Not Found" }
        ).reduce((acc, currency) => {
          acc.push(currency.name);
          return acc;
        }, []),
        languages: Object.values(country.languages || {}) || ["Not Found"],
        borderCountries: (country.borders || [])
          .reduce((acc, countryCode) => {
            acc.push(countryCodes[countryCode]);
            return acc;
          }, [])
          .filter((country) => country),
      };
      return acc;
    }, {});

    return countriesDetails;
  } catch (error) {
    return error;
  }
}
