export function filterListings(listings, { search, category, minPrice, maxPrice, location, onlyApproved = true } = {}) {
  const s = (search || '').trim().toLowerCase();
  const cat = (category || '').trim().toLowerCase();
  const loc = (location || '').trim().toLowerCase();
  const min = minPrice != null ? Number(minPrice) : null;
  const max = maxPrice != null ? Number(maxPrice) : null;

  return listings.filter(l => {
    if (onlyApproved && l.status !== 'approved') return false;
    if (s && !(`${l.name} ${l.description || ''}`.toLowerCase().includes(s))) return false;
    if (cat && String(l.category || '').toLowerCase() !== cat) return false;
    if (loc && !String(l.location || '').toLowerCase().includes(loc)) return false;
    if (min != null && Number(l.price) < min) return false;
    if (max != null && Number(l.price) > max) return false;
    return true;
  });
}
