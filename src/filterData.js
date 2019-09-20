
 export default function FilterData(search, end, dataa) {
    return dataa
    .filter(value => {
            if (value.first_name.toLowerCase().includes(search.toLowerCase())) {
                return true;
            }
            return false;
        })
        .slice(0, end);
}