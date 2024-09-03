import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTramits } from '../../shared/hooks/useTramits.ts';
import TramitListComponent from '../../shared/components/TramitCustom/TramitListComponent.tsx';
import { Tramit } from '../../entities/Tramit.ts';
import { Typography } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';

const TramitsViewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchTramitsByTramitadorId } = useTramits();
    const [tramits, setTramits] = useState<Tramit[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadTramits = async () => {
            if (id) {
                const tramitList = await fetchTramitsByTramitadorId(parseInt(id));
                setTramits(tramitList);
            }
        };

        loadTramits();
    }, [id]);

    const handleCreateNewTramit = () => {
        if (id) {
            navigate(`/TramitEase/Tramitador/${id}/Custom/TramitsCustom/TramitCreateNew`);
        }
    };
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                minHeight: '646px',
                minWidth: '1843px',
                padding: '30px 10px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black' }}>
                Trámites Creados
            </Typography>
            <TramitListComponent tramits={tramits} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '100px' }}>
                <CustomButton
                    color={"ternary"}
                    $textStyle={"bold"}
                    size={"s"}
                    $text={"Crear un nuevo Tramite"}
                    onClick={handleCreateNewTramit}
                />
            </div>
        </div>
    );
};

export default TramitsViewPage;
