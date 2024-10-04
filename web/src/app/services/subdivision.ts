import { environment } from "../../environments/environment";

export async function getSubdivisions(criteria: any): Promise<any> {
  const results = await fetchAsJson(environment.apiUrl);
  const filteredResults = filterInTheFrontend(results, criteria) as [];
  const paginatedResults = paginateResultsInTheFrontEnd([...filteredResults], criteria);

  return [paginatedResults, filteredResults.length];
}

async function fetchAsJson(url: string) {
  const response = await fetch(url);
  const { subdivisions } = await response.json();
  return subdivisions;
}

function filterInTheFrontend(allResults: any[], criteria: any ): any[] {
  const { filter } = criteria;
  if (!filter) {
    return allResults
  }
  return allResults.filter(subdivision => subdivision?.subdivisionStatusCode === filter)
}

function paginateResultsInTheFrontEnd(filteredResults: any[], criteria: any): any[] {
  const { pageIndex, pageSize, sortField } = criteria;
  const paginatedResults = filteredResults.sort((a, b) => compareSubdivisions(a, b, sortField));
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  return paginatedResults.slice(start , end);
}

function compareSubdivisions(a: any, b: any, sortField: string): number {
  if (!sortField) {
    return 0;
  }
  const [field, direction] = sortField.split('-').reverse();
  const compare = compareAllowingNull(a[field], b[field]) as number;
  return direction !== undefined ? (compare * -1) : compare;
}

function compareAllowingNull(a: any, b: any): number {
  if (a == null && b == null) {
    return 0;
  }
  if (a == null || b == null) {
    return a != null ? 1 : -1;
  }
  return a.localeCompare(b);
}