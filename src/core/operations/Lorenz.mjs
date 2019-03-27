/**
 * Emulation of the Lorenz SZ40/42a/42b cipher attachment.
 * 
 * @author VirtualColossus [martin@virtualcolossus.co.uk]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError";

/**
 * Lorenz operation
 */
class Lorenz extends Operation {

    /**
     * Lorenz constructor
     */
    constructor() {
        super();

        this.name = "Lorenz";
        this.module = "Default";
        this.description = "Enciphers characters using the World War 2 German Lorenz SZ cipher attachment.";
        this.infoURL = "https://lorenz.virtualcolossus.co.uk";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Model",
                type: "option",
                "value": ["SZ40", "SZ42a", "SZ42b"]
            },
            {
                name: "Wheel Pattern",
                type: "argSelector",
                "value": [
                	{
                		name: "KH Pattern",
                		off: [19,20,21,22,23,24,25,26,27,28,29,30],
                	},
                	{
                		name: "ZMUG Pattern",
                		off: [19,20,21,22,23,24,25,26,27,28,29,30]
                	},
                	{
                		name: "BREAM Pattern",
                		off: [19,20,21,22,23,24,25,26,27,28,29,30]
                	},
                	{
                		name: "No Pattern",
                		off: [19,20,21,22,23,24,25,26,27,28,29,30]
                	},
                	{
                		name: "Custom",
                		on: [19,20,21,22,23,24,25,26,27,28,29,30]
                	}
                ]
            },
            {
                name: "KT-Schalter",
                type: "boolean"
            },
            {
                name: "Mode",
                type: "argSelector",
                "value": [
                	{
                		name: "Send",
                		on: [4],
                		off: [5]
                	},
                	{
                		name: "Receive",
                		off: [4],
                		on: [5]
                	}
                ]
            },
            {
                name: "Input Type",
                type: "option",
                "value": ["Plaintext", "ITA2"]
            },
            {
                name: "Output Type",
                type: "option",
                "value": ["Plaintext", "ITA2"]
            },
            {
            	name: "ITA2 Format",
            	type: "option",
                "value": ["5/8/9", "+/-/."]
            },
            {
            	name: "Ψ1 start (1-43)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Ψ2 start (1-47)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Ψ3 start (1-51)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Ψ4 start (1-53)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Ψ5 start (1-59)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Μ37 start (1-37)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Μ61 start (1-61)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Χ1 start (1-41)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Χ2 start (1-31)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Χ3 start (1-29)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Χ4 start (1-26)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Χ5 start (1-23)",
            	type: "number",
            	"value": 1
            },
            {
            	name: "Ψ1 lugs (43)",
            	type: "string",
            	value: ".x...xx.x.x..xxx.x.x.xxxx.x.x.x.x.x..x.xx.x"
            },
            {
            	name: "Ψ2 lugs (47)",
            	type: "string",
            	value: ".xx.x.xxx..x.x.x..x.xx.x.xxx.x....x.xx.x.x.x..x"
            },
            {
            	name: "Ψ3 lugs (51)",
            	type: "string",
            	value: ".x.x.x..xxx....x.x.xx.x.x.x..xxx.x.x..x.x.xx..x.x.x"
            },
            {
            	name: "Ψ4 lugs (53)",
            	type: "string",
            	value: ".xx...xxxxx.x.x.xx...x.xx.x.x..x.x.xx.x..x.x.x.x.x.x."
            },
            {
            	name: "Ψ5 lugs (59)",
            	type: "string",
            	value: "xx...xx.x..x.xx.x...x.x.x.x.x.x.x.x.xx..xxxx.x.x...xx.x..x."
            },
            {
            	name: "Μ37 lugs (37)",
            	type: "string",
            	value: "x.x.x.x.x.x...x.x.x...x.x.x...x.x...."
            },
            {
            	name: "Μ61 lugs (61)",
            	type: "string",
            	value: ".xxxx.xxxx.xxx.xxxx.xx....xxx.xxxx.xxxx.xxxx.xxxx.xxx.xxxx..."
            },
            {
            	name: "Χ1 lugs (41)",
            	type: "string",
            	value: ".x...xxx.x.xxxx.x...x.x..xxx....xx.xxxx.."
            },
            {
            	name: "Χ2 lugs (31)",
            	type: "string",
            	value: "x..xxx...x.xxxx..xx..x..xx.xx.."
            },
            {
            	name: "Χ3 lugs (29)",
            	type: "string",
            	value: "..xx..x.xxx...xx...xx..xx.xx."
            },
            {
            	name: "Χ4 lugs (26)",
            	type: "string",
            	value: "xx..x..xxxx..xx.xxx....x.."
            },
            {
            	name: "Χ5 lugs (23)",
            	type: "string",
            	value: "xx..xx....xxxx.x..x.x.."
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        
        const model = args[0],
        	pattern = args[1],
        	kt = args[2],
        	mode = args[3],        	
        	format = args[6];

        var	intype = args[4],
        	outtype = args[5],
        	s1 = args[7],
        	s2 = args[8],
        	s3 = args[9],
        	s4 = args[10],
        	s5 = args[11],
        	m37 = args[12],
        	m61 = args[13],
			x1 = args[14],
        	x2 = args[15],
        	x3 = args[16],
        	x4 = args[17],
        	x5 = args[18],
        	lugs1 = args[19],
        	lugs2 = args[20],
        	lugs3 = args[21],
        	lugs4 = args[22],
        	lugs5 = args[23],
        	lugm37 = args[24],
        	lugm61 = args[25],
        	lugx1 = args[26],
        	lugx2 = args[27],
        	lugx3 = args[28],
        	lugx4 = args[29],
        	lugx5 = args[30],
        	figShifted = false;

        this.reverseTable();
 		
 		if (s1<1 || s1>43) throw new OperationError("Ψ1 start must be between 1 and 43");
 		if (s2<1 || s2>47) throw new OperationError("Ψ2 start must be between 1 and 47");
 		if (s3<1 || s3>51) throw new OperationError("Ψ3 start must be between 1 and 51");
 		if (s4<1 || s4>53) throw new OperationError("Ψ4 start must be between 1 and 53");
 		if (s5<1 || s5>59) throw new OperationError("Ψ5 start must be between 1 and 59");
 		if (m37<1 || m37>37) throw new OperationError("Μ37 start must be between 1 and 37");
 		if (m61<1 || m61>61) throw new OperationError("Μ61 start must be between 1 and 61");
 		if (x1<1 || x1>41) throw new OperationError("Χ1 start must be between 1 and 41");
 		if (x2<1 || x2>31) throw new OperationError("Χ2 start must be between 1 and 31");
 		if (x3<1 || x3>29) throw new OperationError("Χ3 start must be between 1 and 29");
 		if (x4<1 || x4>26) throw new OperationError("Χ4 start must be between 1 and 26");
 		if (x5<1 || x5>23) throw new OperationError("Χ5 start must be between 1 and 23");

        // Initialise chosen wheel pattern
        if(pattern=="Custom") {
        	var re = new RegExp("^[\.xX]*$");
        	if (lugs1.length != 43 || !re.test(lugs1) ) throw new OperationError("Ψ1 custom lugs must be 43 long and can only include . or x ");
        	if (lugs2.length != 47 || !re.test(lugs2) ) throw new OperationError("Ψ2 custom lugs must be 47 long and can only include . or x");
        	if (lugs3.length != 51 || !re.test(lugs3) ) throw new OperationError("Ψ3 custom lugs must be 51 long and can only include . or x");
        	if (lugs4.length != 53 || !re.test(lugs4) ) throw new OperationError("Ψ4 custom lugs must be 53 long and can only include . or x");
        	if (lugs5.length != 59 || !re.test(lugs5) ) throw new OperationError("Ψ5 custom lugs must be 59 long and can only include . or x");
        	if (lugm37.length != 37 || !re.test(lugm37) ) throw new OperationError("M37 custom lugs must be 37 long and can only include . or x");
        	if (lugm61.length != 61 || !re.test(lugm61) ) throw new OperationError("M61 custom lugs must be 61 long and can only include . or x");
        	if (lugx1.length != 41 || !re.test(lugx1) ) throw new OperationError("Χ1 custom lugs must be 41 long and can only include . or x");
        	if (lugx2.length != 31 || !re.test(lugx2) ) throw new OperationError("Χ2 custom lugs must be 31 long and can only include . or x");
        	if (lugx3.length != 29 || !re.test(lugx3) ) throw new OperationError("Χ3 custom lugs must be 29 long and can only include . or x");
        	if (lugx4.length != 26 || !re.test(lugx4) ) throw new OperationError("Χ4 custom lugs must be 26 long and can only include . or x");
        	if (lugx5.length != 23 || !re.test(lugx5) ) throw new OperationError("Χ5 custom lugs must be 23 long and can only include . or x");
        	var chosenSetting = INIT_PATTERNS["No Pattern"];
        	console.log(chosenSetting);
        	chosenSetting["S"][1] = this.readLugs(lugs1);
        	chosenSetting["S"][2] = this.readLugs(lugs2);
        	chosenSetting["S"][3] = this.readLugs(lugs3);
        	chosenSetting["S"][4] = this.readLugs(lugs4);
        	chosenSetting["S"][5] = this.readLugs(lugs5);
        	chosenSetting["M"][1] = this.readLugs(lugm37);
        	chosenSetting["M"][2] = this.readLugs(lugm61);
        	chosenSetting["X"][1] = this.readLugs(lugx1);
        	chosenSetting["X"][2] = this.readLugs(lugx2);
        	chosenSetting["X"][3] = this.readLugs(lugx3);
        	chosenSetting["X"][4] = this.readLugs(lugx4);
        	chosenSetting["X"][5] = this.readLugs(lugx5);
        	console.log(chosenSetting);
        } else {
        	var chosenSetting = INIT_PATTERNS[pattern];
        }
        var chiSettings = chosenSetting["X"]; // Pin settings for Chi links (X)
        var psiSettings = chosenSetting["S"]; // Pin settings for Psi links (S)
        var muSettings = chosenSetting["M"]; // Pin settings for Motor links (M)

        var ita2 = "";
        if(mode == "Send") {

	        // Convert input text to ITA2 (including figure/letter shifts)
	        ita2 = Array.prototype.map.call(input, function(character) {
	        	var letter = character.toUpperCase();
	            
	        	if(intype == "Plaintext") {
		            if (validChars.indexOf(letter) === -1) throw new OperationError("Invalid Plaintext character");

		            if( !figShifted && figShiftedChars.indexOf(letter) !== -1 ) {
		            	// in letters mode and next char needs to be figure shifted
		            	figShifted = true;
		            	return "55" + figShiftArr[letter];
		            } else if( figShifted ) {
		            	// in figures mode and next char needs to be letter shifted
		            	if(letter=="\n") return "34";
                        if(letter=="\r") return "4";
                        if( figShiftedChars.indexOf(letter) === -1 ) {
			            	figShifted = false;
			            	return "88" + letter;
		            	} else {
		            		return figShiftArr[letter];
		            	}
		            	
		            } else {
		            	if(letter=="\n") return "34";
                        if(letter=="\r") return "4";
                        return letter;
		            }

	        	} else {

	        		if (validITA2.indexOf(letter) === -1) throw new OperationError("Invalid ITA2 character");
	        		
	        		return letter;

	        	}

	        });

        } else {

        	// Receive input should always be ITA2
	        ita2 = Array.prototype.map.call(input, function(character) {
	        	var letter = character.toUpperCase();
	        	if (validITA2.indexOf(letter) === -1) throw new OperationError("Invalid ITA2 character");
	        	return letter;
	        });

        }

        const ita2Input = ita2.join("");
        console.log(ita2Input);

        var thisPsi = [];
        var thisChi = [];
        var thisMu = [];
        var m61lug = muSettings[1][m61-1];
        var m37lug = 0;
		var p5 = [0,0,0];

        const self = this;
        const letters = Array.prototype.map.call(ita2Input, function(character) {
            const letter = character.toUpperCase();

            //console.log(s1+' '+s2+' '+s3+' '+s4+' '+s5+' : '+m37+' '+m61+' : '+x1+' '+x2+' '+x3+' '+x4+' '+x5);

            var x2bptr = x2+1;
    		if(x2bptr==32) x2bptr=1;
    		var s1bptr = s1+1;
    		if(s1bptr==44) s1bptr=1;

            thisChi = [
				chiSettings[1][x1-1],
				chiSettings[2][x2-1],
				chiSettings[3][x3-1],
				chiSettings[4][x4-1],
				chiSettings[5][x5-1]
			];

			thisPsi = [
				psiSettings[1][s1-1],
				psiSettings[2][s2-1],
				psiSettings[3][s3-1],
				psiSettings[4][s4-1],
				psiSettings[5][s5-1]
			];

			thisMu = [
				muSettings[1][m61-1],
				muSettings[2][m37-1]
			];

			console.log(letter + ' + ' + self.REVERSE_ITA2_TABLE[thisPsi.join("")] + ' + ' + self.REVERSE_ITA2_TABLE[thisChi.join("")]);

            if (typeof ITA2_TABLE[letter] == "undefined") {
                return "";
            }

            var xorSum = [];
            for(var i=0;i<=4;i++) {
                xorSum[i] = ITA2_TABLE[letter][i] ^ thisPsi[i] ^ thisChi[i];
            }
            const resultStr = xorSum.join("");

            // Move Chi wheels one back after each letter
            if(--x1 < 1) x1 = 41;
            if(--x2 < 1) x2 = 31;
            if(--x3 < 1) x3 = 29;
            if(--x4 < 1) x4 = 26;
            if(--x5 < 1) x5 = 23;

            // Motor wheel (61 pin) also moves one each letter
            if(--m61 < 1) m61 = 61;

            // If M61 is set, we also move M37
            if(m61lug == 1) {
				if(--m37 < 1) m37 = 37;            	
            }

            var basicmotor = m37lug;
    		var totalmotor = basicmotor;
    		var lim = 0;

            p5[2] = p5[1];
            p5[1] = p5[0];
            p5[0] = ITA2_TABLE[letter][4];
            console.log('p5='+ITA2_TABLE[letter]+' ('+letter+') = '+p5[0]);

		    // Limitations here
			if(model=='SZ42a') {
		    	// Chi 2 one back lim - The active character of chi 2 (2nd Chi wheel) in the previous position
		    	lim = chiSettings[2][x2bptr-1];       	
		    	if(kt) {
		    		console.log('lim='+lim+', p5-2='+p5[2]);
                    if(lim==p5[2]) { lim = 0; } else { lim=1; } //p5 back 2
		    	}
                
		    	// If basic motor = 0 and limitation = 1, Total motor = 0 [no move], otherwise, total motor = 1 [move]
		    	if(basicmotor==0 && lim==1) {
		    		totalmotor = 0;
		    	} else {
		    		totalmotor = 1;
		    	}   
                console.log('BM='+basicmotor+', LM='+lim+', TM='+totalmotor);

		    } else if(model=='SZ42b') {
		    	// Chi 2 one back + Psi 1 one back.
		    	const x2b1lug = chiSettings[2][x2bptr-1];
		    	const s1b1lug = psiSettings[1][s1bptr-1];
		    	lim = 1;
		    	if(x2b1lug==s1b1lug) lim=0;
		    	if(kt) {
		    		if(lim==p5[2]) { lim=0; } else { lim=1; } //p5 back 2	
		    	}
                console.log('BM='+basicmotor+', LM='+lim);
		    	// If basic motor = 0 and limitation = 1, Total motor = 0 [no move], otherwise, total motor = 1 [move]
		    	if(basicmotor==0 && lim==1) {
		    		totalmotor = 0;
		    	} else {
		    		totalmotor = 1;
		    	}

    		} else if(model=="SZ40") {
    			// SZ40
	    		totalmotor = basicmotor;
                console.log('TM='+basicmotor);
    		} else {
    			throw new OperationError("Lorenz model type not recognised");
    		}

    		// increment Psi wheels when current totalmotor active
    		if(totalmotor == 1) {
	            if(--s1 < 1) s1 = 43;
	            if(--s2 < 1) s2 = 47;
	            if(--s3 < 1) s3 = 51;
	            if(--s4 < 1) s4 = 53;
	            if(--s5 < 1) s5 = 59;
    		}

            m61lug = muSettings[1][m61-1];
            m37lug = muSettings[2][m37-1];

	  		var rtnstr = self.REVERSE_ITA2_TABLE[resultStr];
            if(format=="5/8/9") {
            	if(rtnstr=="+") rtnstr="5";
            	if(rtnstr=="-") rtnstr="8";
            	if(rtnstr==".") rtnstr="9";
            }
            return rtnstr;
        });

        var ita2output = letters.join("");
        var output = "";

        if(mode == "Receive") {

        	figShifted = false;

	        // Convert output ITA2 to plaintext (including figure/letter shifts)
	        const out = Array.prototype.map.call(ita2output, function(letter) {
	            
	        	if(outtype == "Plaintext") {

	        		if( letter == "5" || letter == "+" ) {
	        			figShifted = true;
	        			return;
	        		} else if( letter == "8" || letter == "-" ) {
	        			figShifted = false;
	        			return;
	        		} else if( letter == "9" ) {
	        			return " ";
	        		} else if( letter == "3" ) {
                        return "\n";
                    } else if( letter == "4" ) {
                        return "";
                    }


	        		if(figShifted) {
	        			return self.REVERSE_FIGSHIFT_TABLE[letter];
	        		} else {
	        			return letter;
	        		}

	        	} else {        		
	        		return letter;
	        	}

	        });
	        output = out.join("");

       	} else {
       		output = ita2output;
       	}

        return output;

    }

    /**
     * Reverses the ITA2 Code lookup table
     */
    reverseTable() {
        this.REVERSE_ITA2_TABLE = {};
        this.REVERSE_FIGSHIFT_TABLE = {};

        for (const letter in ITA2_TABLE) {
            const code = ITA2_TABLE[letter];
            this.REVERSE_ITA2_TABLE[code] = letter;
        }
        for (const letter in figShiftArr) {
        	const ltr = figShiftArr[letter];
        	this.REVERSE_FIGSHIFT_TABLE[ltr] = letter;
        }
    }

    readLugs(lugstr) {
    	var arr = Array.prototype.map.call(lugstr, function(lug) {
    		if(lug==".") {
    			return 0;
    		} else {
    			return 1;
    		} 
    	});
    	return arr;
    }

}

const ITA2_TABLE = {
    "A": "11000",
    "B": "10011",
    "C": "01110",
    "D": "10010",
    "E": "10000",
    "F": "10110",
    "G": "01011",
    "H": "00101",
    "I": "01100",
    "J": "11010",
    "K": "11110",
    "L": "01001",
    "M": "00111",
    "N": "00110",
    "O": "00011",
    "P": "01101",
    "Q": "11101",
    "R": "01010",
    "S": "10100",
    "T": "00001",
    "U": "11100",
    "V": "01111",
    "W": "11001",
    "X": "10111",
    "Y": "10101",
    "Z": "10001",
    "3": "00010",
    "4": "01000",
    "9": "00100",
    "/": "00000",
    " ": "00100",
    ".": "00100",
    "8": "11111",
    "5": "11011",
    "-": "11111",
    "+": "11011"
};

const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+-'()/:=?,. \n\r";
const validITA2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ34589+-./";
const figShiftedChars = "1234567890+-'()/:=?,."

const figShiftArr = {
  "1" : "Q",
  "2" : "W",
  "3" : "E",
  "4" : "R",
  "5" : "T",
  "6" : "Y",
  "7" : "U",
  "8" : "I",
  "9" : "O",
  "0" : "P",
  " " : "9",
  "-" : "A",
  "?" : "B",
  ":" : "C",
  "#" : "D",
  "%" : "F",
  "@" : "G",
  "£" : "H",
  "(" : "K",
  ")" : "L",
  "." : "M",
  "," : "N",
  "'" : "S",
  "=" : "V",
  "/" : "X",
  "+" : "Z",
  "\n" : "3",
  "\r" : "4"
};

const INIT_PATTERNS = {
    "No Pattern" : {
        "X" : {
            1 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            2 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            3 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            4 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            5 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        "S" : {
            1 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            2 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            3 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            4 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            5 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        },
        "M" : {
            1 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            2 : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }

    },
    "KH Pattern" : {
        "X" : {
            1 : [0,1,0,0,0,1,1,1,0,1,0,1,1,1,1,0,1,0,0,0,1,0,1,0,0,1,1,1,0,0,0,0,1,1,0,1,1,1,1,0,0],
            2 : [1,0,0,1,1,1,0,0,0,1,0,1,1,1,1,0,0,1,1,0,0,1,0,0,1,1,0,1,1,0,0],
            3 : [0,0,1,1,0,0,1,0,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,1,1,0],
            4 : [1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,0,1,1,1,0,0,0,0,1,0,0],
            5 : [1,1,0,0,1,1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,1,0,0]
        },
        "S" : {
            1 : [0,1,0,0,0,1,1,0,1,0,1,0,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1,1,0,1],
            2 : [0,1,1,0,1,0,1,1,1,0,0,1,0,1,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,0,1],
            3 : [0,1,0,1,0,1,0,0,1,1,1,0,0,0,0,1,0,1,0,1,1,0,1,0,1,0,1,0,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,0,1,0,1,0,1],
            4 : [0,1,1,0,0,0,1,1,1,1,1,0,1,0,1,0,1,1,0,0,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
            5 : [1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,1,1,1,0,1,0,1,0,0,0,1,1,0,1,0,0,1,0]
        },
        "M":  {
            1 : [0,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,0,0],
            2 : [1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0]
        }
    },
    "ZMUG Pattern" :  {
        "X" : {
            1 : [0,1,1,0,1,1,0,0,0,1,1,0,1,1,0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,1,0],
            2 : [1,1,0,1,1,0,0,0,0,1,1,1,0,1,1,1,1,0,1,0,0,0,1,1,0,0,1,1,0,0,0],
            3 : [0,0,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0,1,1,0,1,1,1,1,0],
            4 : [1,0,1,0,1,0,0,1,1,0,0,0,1,1,0,0,1,0,1,1,1,0,0,1,0,1],
            5 : [0,1,0,0,1,1,1,1,0,0,0,1,0,1,1,1,0,0,0,0,1,0,1],
        },
        "S" : {
            1 : [1,1,0,1,0,0,1,1,0,0,0,1,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,0],
            2 : [0,0,0,1,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,0,1,1],
            3 : [0,1,0,0,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,1],
            4 : [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,1,1,1,1,0,0,0,1,0,0,0,1,1,0,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,1,0,0,1,1,1,0,1],
            5 : [1,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,1,0,0,0,1,1,0]
        },
        "M" : {
            1 : [1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1],
            2 : [0,1,0,1,0,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1]
        }
    },
    "BREAM Pattern" : {
        "X" : {
            1 : [0,1,1,1,1,0,1,0,1,1,0,1,0,1,1,0,0,1,0,0,1,1,0,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0,0,0],
            2 : [0,1,1,1,0,0,0,0,1,0,0,0,1,1,0,1,0,1,0,0,0,1,1,0,1,1,1,0,0,1,1],
            3 : [1,1,0,0,1,1,0,1,1,0,0,1,1,1,0,0,0,0,1,0,0,1,1,0,1,1,1,0,0],
            4 : [1,1,1,1,0,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,0,0,1,1,0,0],
            5 : [0,1,1,1,0,1,1,1,0,0,0,1,0,0,1,1,0,1,0,0,0,1,0]
        },
        "S" : {
            1 : [0,0,0,1,1,1,0,0,1,1,1,0,1,1,0,0,1,0,1,0,1,1,0,1,1,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0],
            2 : [1,1,0,1,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,0],
            3 : [1,0,0,1,0,0,1,1,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,1,0,1,0,1,1,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            4 : [0,1,0,0,0,0,1,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,0,1],
            5 : [1,0,1,0,1,0,0,1,1,0,0,1,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,1,0,1,1,0,1,1,1,1,0,1,1,1,0,0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,1,0]
        },
        "M" : {
            1 : [1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,1,1,0,1,1,0,1,0,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0,1,1,0,1,0,1,1,1],
            2 : [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,1,0,1]
        }
    }
};

export default Lorenz;
