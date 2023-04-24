interface LanguageToolResponse {
    software: {
      name: string;
      version: string;
      buildDate: string;
      apiVersion: number;
      premium: boolean;
      premiumHint: string;
      status: string;
    };
    warnings: {
      incompleteResults: boolean;
    };
    language: {
      name: string;
      code: string;
      detectedLanguage: {
        name: string;
        code: string;
        confidence: number;
        source: string;
      };
    };
    matches: {
      message: string;
      shortMessage: string;
      replacements: {
        value: string;
      }[];
      offset: number;
      length: number;
      context: {
        text: string;
        offset: number;
        length: number;
      };
      sentence: string;
      type: {
        typeName: string;
      };
      rule: {
        id: string;
        description: string;
        issueType: string;
        urls: {
          value: string;
        }[];
        category: {
          id: string;
          name: string;
        };
        isPremium: boolean;
      };
      ignoreForIncompleteSentence: boolean;
      contextForSureMatch: number;
    }[];
    sentenceRanges: [number, number][];
  }
interface MatchType{
        message: string;
        shortMessage: string;
        replacements: {
          value: string;
        }[];
        offset: number;
        length: number;
        context: {
          text: string;
          offset: number;
          length: number;
        };
        sentence: string;
        type: {
          typeName: string;
        };
        rule: {
          id: string;
          description: string;
          issueType: string;
          urls: {
            value: string;
          }[];
          category: {
            id: string;
            name: string;
          };
          isPremium: boolean;
        };
        ignoreForIncompleteSentence: boolean;
        contextForSureMatch: number;
      
}