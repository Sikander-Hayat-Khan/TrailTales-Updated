query : expr (AND expr)* ;
expr : term (OR term)* ;
term : WORD | PHRASE ;
AND : 'AND' ;
OR : 'OR' ;
WORD : [a-zA-Z0-9]+ ;
PHRASE : '"' (~["\r\n])* '"' ;
WS : [ \t\r\n]+ -> skip ;