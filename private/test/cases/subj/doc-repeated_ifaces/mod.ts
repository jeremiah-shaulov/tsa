export interface Inter1
{
	/**	The prop 1.
	 **/
	prop1: string;

	/**	The method 1 signature 1.
	 **/
	method1(arg: string): void;
}
export interface Inter1
{
	/**	The prop 2.
	 **/
	prop2: string;

	/**	The method 1 signature 2.
	 **/
	method1(arg: number): void;

	/**	The method 2 signature 1.
	 **/
	method2(arg: string): void;

	/**	The method 2 signature 2.
	 **/
	method2(arg: number): void;
}

export interface Inter2
{
	/**	The prop 3.
	 **/
	prop3: string;
}

export interface Inter3 extends Inter1
{
	/**	Another comment for prop 1.
	 **/
	prop1: string;

	/**	The prop 4.
	 **/
	prop4: string;
}
export interface Inter3 extends Inter2
{
	/**	Yet another comment for prop 1.
	 **/
	prop1: string;

	/**	Another comment for prop 2.
	 **/
	prop2: string;

	/**	Another comment for prop 3.
	 **/
	prop3: string;

	/**	Another comment for method 1 signature 1.
	 **/
	method1(arg: string): void;

	/**	Another comment for method 1 signature 2.
	 **/
	method1(arg: number): void;
}

export interface Inter4 extends Inter3
{
	/**	Another comment for method 1 (2 signatures).
	 **/
	method1(arg: string|number): void;
}
