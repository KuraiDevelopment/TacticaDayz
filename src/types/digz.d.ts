// types/digz.d.ts
declare module 'digz' {
  const digz: any;  // Or more specific if you know the API: { query: (options: any) => Promise<any> }
  export default digz;
}