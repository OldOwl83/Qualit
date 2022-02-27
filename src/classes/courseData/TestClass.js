export class Test
{
    constructor( name, percentWeight = 0, additionalData = '' )
    {
        if( typeof name !== "string" || typeof percentWeight !== "number" || typeof additionalData !== 'string' )
            throw TypeError("Los objetos TestGroup toman un string, un number y otro string como parámetros.");

        this.test = name;
        this.percentWeight = percentWeight;
        this.additionalData = additionalData;
    }
}