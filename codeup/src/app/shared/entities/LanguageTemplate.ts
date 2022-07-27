export interface LanguagesTemplate {
  languageTemplate: LanguageTemplate[];
}

export interface LanguageTemplate {
  value: string;
  name: string;
  defaultCode: string;
}

export const languagesTemplate: LanguagesTemplate = {
  languageTemplate: [
    {name: "Python", value: "python", defaultCode: "# Write your code here"},
    {name: "JavaScript", value: "js", defaultCode: "// Write your code here"},
    {name: "Java", value: "java", defaultCode: "public class Main {\n   public static void main(String[] args) {\n      // Write your code here\n    }\n}"},
    {name: "C", value: "c", defaultCode: "#include <stdio.h>\nint main() {\n    // Write your code here\n    return 0;\n}"},
    {name: "PHP", value: "php", defaultCode: "<?php echo '<p>Bonjour le monde</p>'; ?>"},
    {name: "C++", value: "cpp", defaultCode: "#include <iostream>\nusing namespace std;\nint main() {\n    // Write your code here\n    return 0;\n}"},
    {name: "C#", value: "csharp", defaultCode: "using System;\nclass MainClass {\n   static void Main() {\n      // Write your code here\n   }\n}"},
    {name: "Ruby", value: "ruby", defaultCode: "# Write your code here"},
    {name: "Swift", value: "swift", defaultCode: "// Write your code here"},
    {name: "Go", value: "go", defaultCode: "package main\nimport \"fmt\"\nfunc main() {\n   fmt.Println(\"hello world\")\n}"},
    {name: "Kotlin", value: "kotlin", defaultCode: "public fun main(args:Array<String>) {\n   // Write your code here\n}"},
    {name: "Rust", value: "rust", defaultCode: "fn main() {\n   // Write your code here\n}"},
    {name: "Haskell", value: "haskell", defaultCode: "-- Write your code here\n"},
    {name: "Scala", value: "scala", defaultCode: "// Write your code here"},
    {name: "D", value: "d", defaultCode: "import std.stdio;\n\nint main() {\n   // Write your code here\n   return 0;\n}"},
    {name: "F#", value: "fsharp", defaultCode: "// Write your code here"},
    {name: "LOLCODE", value: "lolcode", defaultCode: "BTW Write your code here"},

  ]
}