import { utils, writeFile } from 'xlsx'

const row_init = 0;
const col_init = 0;

export const exportToXLSX = ( data ) => {

    const book = utils.book_new();
    
    data.institutions.map( instit => {
        
        const sheet = utils.aoa_to_sheet([]);
        
        let row = row_init;
        let col = col_init;
        
        utils.sheet_add_aoa( sheet, [[`Institución: ${instit.institution}`]], {origin: {c: col, r: row}})
        
        sheet['!merges'] = [{s: {c: col, r: row}, e: {c: 10, r: row}}];

        row++;

        instit.groups.map( group => {
            
            utils.sheet_add_aoa( sheet, [[`Grupo: ${group.group}`]], {origin: {c: col, r: row}});
            
            sheet['!merges'].push( {s: {c: col, r: row}, e: {c: 10, r: row}} );

            row += 2;

            group.courses.map( course => {

                utils.sheet_add_aoa( sheet, [[`Curso: ${course.course}`]], {origin: {c: col, r: row}});
                
                sheet['!merges'].push( {s: {c: col, r: row}, e: {c: 10, r: row}} );

                row += 2;

                const students = group.students.map( student => [ `${student.lastName}, ${student.firstName}` ]);

                const first_column = [['ETAPAS'], ['CATEGORÍAS'], ['EVALUACIONES']].concat( students );

                utils.sheet_add_aoa( sheet, first_column, {origin: {c: col, r: row}})

                col++;

                course.stages.map( stage => {

                    let stage_col_init = col;
                    let stages_row_init = row;

                    utils.sheet_add_aoa( sheet, [[ stage.stage ]], {origin: {c: stage_col_init, r: row}});

                    row++;

                    stage.testGroups.map( testGroup => {

                        let tG_col_init = col;
                        let tGs_row_init = row;

                        utils.sheet_add_aoa( sheet, [[ testGroup.testGroup ]], {origin: {c: tG_col_init, r: row}});

                        row++;

                        testGroup.tests.map( test => {

                            utils.sheet_add_aoa( sheet, [[ test.test ]], {origin: {c: col, r: row}});

                            const scores = group.students.map( student => {
                                const score = [test.grades.filter( grade => grade.idStudent === student.id )[0].score]

                                return score;
                            })

                            utils.sheet_add_aoa( sheet, scores, {origin: {c: col, r: row + 1}});

                            col++;
                        });

                        sheet['!merges'].push( {
                            s: {c: tG_col_init, r: tGs_row_init}, 
                            e: {c: col - 1, r: tGs_row_init}} );

                        //col++;

                        utils.sheet_add_aoa( sheet, [[ 'Prom. cat.' ]], {origin: {c: col, r: row - 1}});

                        const averages = group.students.map( student => {

                            const average = [ testGroup.getAverage( student.id ) ];

                            return average
                        });

                        utils.sheet_add_aoa( sheet, averages, {origin: {c: col, r: row + 1}});

                        row = tGs_row_init;
                        col++;
                    });

                    sheet['!merges'].push( {
                        s: {c: stage_col_init, r: stages_row_init}, 
                        e: {c: col - 1, r: stages_row_init}} );

                    utils.sheet_add_aoa( sheet, [[ 'Prom. etapa' ]], {origin: {c: col, r: row - 1}});

                    const averages = group.students.map( student => {

                        const average = [ stage.getAverage( student.id ) ];

                        return average
                    });

                    utils.sheet_add_aoa( sheet, averages, {origin: {c: col, r: row + 2}});
                    
                    row = stages_row_init;
                    col++;
                });

                col++;
    
                utils.sheet_add_aoa( sheet, [[ 'Prom. gral.' ]], {origin: {c: col, r: row - 1}});
    
                const averages = group.students.map( student => {
    
                    const average = [ course.getAverage( student.id ) ];
    
                    return average
                });
    
                utils.sheet_add_aoa( sheet, averages, {origin: {c: col, r: row + 3}});

                row += group.students.length + 6;
                col = col_init;
            });

        });

        utils.book_append_sheet( book, sheet, instit.institution.length <= 30 ? instit.institution : instit.institution.slice(0, 30) );
    });
    
    const today = new Date(Date.now())
    writeFile( 
        book, 
        `QualitBackup_${ today.getDate() }-${ today.getMonth() + 1 }-${ today.getFullYear() }.xlsx` );
}