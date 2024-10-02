import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { useProcedures } from '../../shared/hooks/useProcedures.ts';
import { Procedure } from '../../entities/Procedure.ts';
import ProceduresListComponent from '../../shared/components/ProcedureCustom/ProceduresListComponent.tsx';

const ProceduresViewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchProceduresByTramitadorId } = useProcedures();
    const [procedures, setprocedures] = useState<Procedure[]>([]);

    useEffect(() => {
        const loadTramits = async () => {
            if (id) {
                const tramitList = await fetchProceduresByTramitadorId(parseInt(id));
                setprocedures(tramitList || []);
            }
        };
        loadTramits();
    }, [id]);

    const handleCreateNewProcedure = () => {
        if (id) {
            navigate(`/TramitEase/Tramitador/${id}/Custom/TramitsCustom/ProcedureCreateNew`);
        }
    };

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                minHeight: '647px',
                minWidth: '1777px',
                padding: '30px 10px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black' }}>
                Procedimientos de Trámites Creados
            </Typography>
            <ProceduresListComponent procedures={procedures} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '100px' }}>
                <CustomButton
                    onClick={handleCreateNewProcedure}
                    color={"ternary"}
                    $textStyle={"bold"}
                    size={"s"}
                    $text={"Crear un nuevo Procedimiento"}
                />
            </div>
        </div>
    );
};

export default ProceduresViewPage;
