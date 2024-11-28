import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTramits } from '../../shared/hooks/useTramits.ts';
import TramitListComponent from '../../shared/components/TramitCustom/TramitListComponent.tsx';
import { Tramit } from '../../entities/Tramit.ts';
import { Typography } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import SearchBar from '../../shared/components/Search/SearchBar.tsx';

const TramitsViewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchTramitsByTramitadorId } = useTramits();
    const [searchQuery, setSearchQuery] = useState('');
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
            navigate(`/Tramitador/${id}/Custom/TramitsCustom/TramitCreateNew`);
        }
    };

    const filteredTramits = tramits.filter(tramit =>
        (tramit.name ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query); // Actualiza el estado de búsqueda
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
                Trámites Creados
            </Typography>
            <SearchBar placeholder="Buscar trámite..." onSearch={handleSearch} />

            <TramitListComponent tramits={filteredTramits} />
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
